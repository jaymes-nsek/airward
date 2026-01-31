import {defer, merge, Observable, of, timer} from 'rxjs';
import {dematerialize, ignoreElements, mapTo, materialize, mergeMap, share, take, takeUntil,} from 'rxjs/operators';

type DelayedLoadingOptions = {
    delayMs: number;       // 100 initial, 0 retry
    minShowMs: number;     // 300
    onShowLoading: () => void;
};

/**
 * Canonical pattern:
 * - show loading only if request still pending after delayMs
 * - if loading is shown, delay terminal emission so loading is visible at least minShowMs
 * - safe for cancellation: unsubscribe cancels timers + request
 */
export function withDelayedLoading<T>(
    source$: Observable<T>,
    {delayMs, minShowMs, onShowLoading}: DelayedLoadingOptions,
): Observable<T> {
    return defer(() => {
        let shownAt: number | null = null;

        // Materialise so we can treat next/error uniformly as "a notification"
        const notifications$ = source$.pipe(
            materialize(),
            share(), // important: single subscription to the request
        );

        // The first notification (next OR error OR complete) means "request has finished"
        const done$ = notifications$.pipe(take(1));

        // Show loading after delayMs, but only if request hasn't finished before then.
        const showLoading$ =
            delayMs === 0
                ? of(null).pipe(
                    // show immediately
                    mergeMap(() => {
                        shownAt = performance.now();
                        onShowLoading();
                        return of(null);
                    }),
                    ignoreElements(),
                )
                : timer(delayMs).pipe(
                    takeUntil(done$),
                    mergeMap(() => {
                        shownAt = performance.now();
                        onShowLoading();
                        return of(null);
                    }),
                    ignoreElements(),
                );

        // Delay the request’s terminal notification if loading was shown,
        // so the loading UI stays up for at least minShowMs.
        const delayedResult$ = notifications$.pipe(
            mergeMap((note) => {
                if (shownAt == null) {
                    return of(note);
                }

                const elapsed = performance.now() - shownAt;
                const remaining = Math.max(0, minShowMs - elapsed);

                return remaining > 0 ? timer(remaining).pipe(mapTo(note)) : of(note);
            }),
            dematerialize(), // back to a normal Observable<T>
        );

        // Run "show loading" side-effect in parallel with the (possibly delayed) result.
        return merge(showLoading$, delayedResult$);
    });
}
