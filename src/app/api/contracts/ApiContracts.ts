export interface ApiMeta {
    requestId?: string;
}

export interface DataResponse<T> {
    items: T[];
    count: number;
}

export interface ApiSuccess<T> {
    success: true;
    data: DataResponse<T>;
    meta?: ApiMeta | string;
}

export interface ErrorDetails {
    code: string;
    message: string;
    details?: unknown;
}

export class ApiError extends Error {
    success: boolean;
    error: ErrorDetails;
    meta?: {
        requestId?: string;
    };

    constructor(error: ErrorDetails) {
        super(`${error.code}: ${error.message}`);
        this.name = 'ApiError';
        this.success = false;
        this.error = error;
    }
}

export function isApiError<T>(res: ApiSuccess<T> | ApiError): res is ApiError {
    return !res.success;
}
