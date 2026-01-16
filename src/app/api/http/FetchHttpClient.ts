import {from, Observable, switchMap, throwError} from "rxjs";
import {type HttpClient, type HttpClientConfig, HttpError} from "./HttpClient";
import type {ApiError} from "../contracts/ApiContracts";
import {fromFetch} from "rxjs/fetch";

type BodyParser<T> = (res: Response) => Observable<T>;

export class FetchHttpClient implements HttpClient {
    private readonly baseUrl: string;
    private readonly defaultHeaders: Record<string, string>;

    constructor(cfg: HttpClientConfig) {
        this.baseUrl = cfg.baseUrl.replace(/\/$/, "");
        this.defaultHeaders = cfg.defaultHeaders ?? {};
    }

    private toUrl(path: string): string {
        if (!path.startsWith("/")) throw new Error(`Path must start with "/": got "${path}"`);
        return `${this.baseUrl}${path}`;
    }

    public getJson<T>(path: string, init?: RequestInit): Observable<T> {
        return this.get<T>(
            path,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    ...this.defaultHeaders,
                    ...(init?.headers ?? {}),
                },
                ...init,
            },
            (res) => {
                const contentType = res.headers.get("content-type") ?? "";
                const isJson = contentType.includes("application/json");
                if (!isJson) {
                    return throwError(
                        () =>
                            new HttpError({
                                status: res.status,
                                message: `Expected JSON but got "${contentType}" for GET ${path}`,
                            })
                    );
                }
                return from(res.json() as Promise<T>);
            }
        );
    }

    public getBlob(path: string, init?: RequestInit): Observable<Blob> {
        return this.get<Blob>(
            path,
            {
                method: "GET",
                headers: {
                    ...this.defaultHeaders,
                    ...(init?.headers ?? {}),
                },
                ...init,
            },
            (res) => from(res.blob())
        );
    }

    /**
     * Common GET pipeline:
     * - perform fetch on subscription
     * - map non-2xx to HttpError (preferring API failure payload when provided)
     * - parse body via caller-supplied parser
     */
    private get<T>(path: string, init: RequestInit, parseBody: BodyParser<T>): Observable<T> {
        return fromFetch(this.toUrl(path), { ...init }).pipe(
            switchMap((res) => {
                if (!res.ok) {
                    return this.mapFailureOrGeneric(path, res);
                }

                return parseBody(res);
            }),
        );
    }

    /**
     * For error responses, attempt to parse the standard API failure shape if the payload is JSON.
     * Otherwise, fall back to a generic HttpError.
     */
    private mapFailureOrGeneric(path: string, res: Response): Observable<never> {
        const contentType = res.headers.get("content-type") ?? "";
        const isJson = contentType.includes("application/json");

        if (!isJson) {
            return throwError(
                () => new HttpError({status: res.status, message: `HTTP ${res.status} for GET ${path}`})
            );
        }

        return from(res.json()).pipe(
            switchMap((payload) => {
                const failure = this.tryParseApiFailure(payload);
                if (failure) {
                    return throwError(
                        () =>
                            new HttpError({
                                status: res.status,
                                message: failure.error.message,
                                code: failure.error.code,
                                requestId: failure.meta?.requestId,
                                details: failure.error.details,
                            })
                    );
                }

                return throwError(
                    () => new HttpError({status: res.status, message: `HTTP ${res.status} for GET ${path}`})
                );
            })
        );
    }

    private tryParseApiFailure(payload: unknown): ApiError | null {
        if (!payload || typeof payload !== "object") return null;

        const maybe = payload as { success?: unknown };
        if (maybe.success !== false) return null;

        const failure = payload as ApiError;
        if (!failure.error?.code || !failure.error?.message) return null;

        return failure;
    }
}
