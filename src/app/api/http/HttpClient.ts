import {Observable} from "rxjs";

export interface HttpClientConfig {
    baseUrl: string;
    defaultHeaders?: Record<string, string>;
}

export interface HttpClient {
    getJson<T>(path: string, init?: RequestInit): Observable<T>;
    getBlob(path: string, init?: RequestInit): Observable<Blob>;
}

export class HttpError extends Error {
    public readonly status: number;
    public readonly code?: string;
    public readonly requestId?: string;
    public readonly details?: unknown;

    constructor(opts: { status: number; message: string; code?: string; requestId?: string; details?: unknown }) {
        super(opts.message);
        this.status = opts.status;
        this.code = opts.code;
        this.requestId = opts.requestId;
        this.details = opts.details;
    }
}