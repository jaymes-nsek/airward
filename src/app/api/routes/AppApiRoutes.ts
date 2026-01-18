const API_PREFIX = '/api/v1' as const;

function join(...parts: string[]) {
    return parts
        .filter(Boolean)
        .map((p, i) => (i === 0 ? p.replace(/\/+$/g, '') : p.replace(/^\/+|\/+$/g, '')))
        .join('/')
        .replace(/\/{2,}/g, '/');
}

function sanitisePath(value: string): string {
    if (value.length === 0) {
        throw new Error('Path segment must not be empty');
    }

    return encodeURIComponent(value);
}

export const apiRoutes = {
    vowels: {
        list: () => join(API_PREFIX, 'vowels'),
        audio: (vowelId: string) => join(API_PREFIX, 'vowels', 'audio', sanitisePath(vowelId)),
    },
} as const;
