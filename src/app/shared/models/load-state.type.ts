export type LoadState =
    | { status: 'loading' }
    | { status: 'success' }
    | { status: 'error'; errorMessage?: string };