import {useCallback, useLayoutEffect, useRef} from "react";

// If functions need returning other primitives, extend this union. In most UI handlers, void is typical.
type AnyFn = (...args: unknown[]) => void | object | string | number | boolean | null | undefined;


/**
 * useEvent - as a last-resort for frequently changing handlers (in-place of useCallback)
 *
 * Returns a stable function reference whose implementation always reflects
 * the latest version of the provided handler.
 *
 * This is useful when:
 * - A child component is memoised (React.memo) and must not re-render due to
 *   changing callback identity.
 * - The callback logic depends on frequently changing state or props.
 * - You need to avoid mount/unmount or render churn caused by handler identity
 *   changes, without weakening dependency correctness.
 *
 * Behaviour:
 * - The returned function identity is stable across renders.
 * - The invoked logic is always the most recent handler.
 *
 * Implementation notes:
 * - useLayoutEffect is used (instead of useEffect) to close the timing window
 *   where a browser event could fire after commit but before the ref is updated.
 * - This mirrors the semantics of React’s proposed `useEvent` hook.
 *
 * Important:
 * - This hook does NOT prevent mount/unmount cycles caused by conditional
 *   rendering or key changes.
 * - It should be used deliberately; prefer `useCallback` where a stable
 *   dependency list is feasible.
 */
export function useEvent<T extends AnyFn>(handler: T): T {
    const handlerRef = useRef(handler);

    useLayoutEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    const stableHandler = useCallback((...args: Parameters<T>) => {
        return handlerRef.current(...args);
    }, []);

    return stableHandler as T;
}