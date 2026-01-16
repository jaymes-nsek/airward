
export interface VowelRoutes {
    list(): string;
}

export interface ApiRoutes {
    vowels: VowelRoutes;
}

export class AppApiRoutes implements ApiRoutes {
    public readonly vowels: VowelRoutes = {
        list: () => "/api/v1/vowels",
    };
}
