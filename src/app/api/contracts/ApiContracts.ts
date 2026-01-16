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

export interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: {
        requestId?: string;
    };
}

export function isApiError<T>(res: ApiSuccess<T> | ApiError): res is ApiError {
    return !res.success;
}
