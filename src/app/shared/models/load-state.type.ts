export type LoadState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success' }
    | { status: 'error'; errorMessage?: string };