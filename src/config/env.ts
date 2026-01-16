
export interface AppEnvironment {
    apiBaseUrl: string;
}

export const env: AppEnvironment = {
    apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string),
};