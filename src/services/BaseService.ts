import {delay, type Observable, of} from "rxjs";
import {FetchHttpClient} from "../app/api/http/FetchHttpClient";
import type {HttpClient} from "../app/api/http/HttpClient";
import {env} from "../config/env.ts";


export abstract class BaseService {
    protected readonly http: HttpClient;

    protected constructor(httpClient?: HttpClient) {
        // Default: environment-based Fetch client; can be overridden in tests
        if (httpClient) {
            this.http = httpClient;
            return;
        }

        this.http = new FetchHttpClient({ baseUrl: env.apiBaseUrl });
    }

    protected simulateResponse<T>(data: T, delayMs = 100): Observable<T> {
        return of(data).pipe(delay(delayMs));
    }

    protected getJson$<T>(path: string, init?: RequestInit): Observable<T> {
        return this.http.getJson<T>(path, init);
    }

    protected getBlob$(path: string, init?: RequestInit): Observable<Blob> {
        return this.http.getBlob(path, init);
    }
}

