import {type RefObject, useCallback, useEffect, useRef} from "react";
import type {VowelDetails} from "../../models/vowel.types.ts";
import type {PlaybackSettings} from "../../models/playback.types.ts";

export interface UseVowelAudioPlaybackResult {
    audioRef: RefObject<HTMLAudioElement | null>;
    onPlayHandler: () => void;
}

function isAbortError(err: unknown): boolean {
    return (
        err instanceof DOMException && err.name === 'AbortError'
    );
}

export function useVowelAudioPlayback(
    selectedVowel: VowelDetails | null,
    audioUrl: string | null,
    playbackSettings: PlaybackSettings,
): UseVowelAudioPlaybackResult {
    const audioRef = useRef<HTMLAudioElement>(null);

    // Monotonically increasing token; any async continuation checks it before doing work.
    const sessionIdRef = useRef(0);

    // Track pending timeout so we can cancel the inter-repeat delay.
    const timeoutIdRef = useRef<number | null>(null);

    const cancelPlayback = useCallback(() => {
        // Invalidate any in-flight async handlers (e.g. after awaiting delay).
        sessionIdRef.current += 1;

        // Clear pending delay between repeats.
        if (timeoutIdRef.current !== null) {
            window.clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }

        const audioEl = audioRef.current;
        if (!audioEl) {
            return;
        }

        // Stop audio and detach handler.
        audioEl.onended = null;
        audioEl.pause();
        audioEl.currentTime = 0;
    }, []);

    // Cancel whenever the "identity" of the playing item changes.
    useEffect(() => {
        cancelPlayback();
    }, [cancelPlayback, audioUrl, selectedVowel?.id]);

    const onPlayHandler = useCallback((): void => {
        if (!audioUrl) {
            return; // audioUrl is the true precondition for playback.
        }

        const audioEl = audioRef.current;

        if (!audioEl) {
            return;
        }

        // Start a fresh session and hard-cancel any previous chain.
        cancelPlayback();
        const sessionId = sessionIdRef.current;

        audioEl.playbackRate = playbackSettings.speed === 'slow' ? 0.5 : 1;
        audioEl.currentTime = 0;

        if (playbackSettings.repeatCount > 1) {
            let remaining = playbackSettings.repeatCount;

            audioEl.onended = () => {
                // Ignore stale callbacks from prior sessions.
                if (sessionIdRef.current !== sessionId) {
                    return;
                }

                remaining -= 1;

                if (remaining <= 0) {
                    audioEl.onended = null;
                    return;
                }

                // Inter-repeat delay that can be cancelled.
                timeoutIdRef.current = window.setTimeout(() => {
                    timeoutIdRef.current = null;

                    if (sessionIdRef.current !== sessionId) {
                        return;
                    }

                    audioEl.currentTime = 0;
                    void audioEl.play().catch((err: unknown) => {
                        // If play fails mid-chain, cancel everything to avoid repeated failures.
                        console.error('Audio playback failed:', err);
                        cancelPlayback();
                    });
                }, 500);
            };
        }

        void audioEl.play().catch((err: unknown) => {
            if (isAbortError(err)) {
                // Expected when we cancel playback (pause) during rapid changes.
                return;
            }

            console.error('Audio playback failed:', err);
            cancelPlayback();
        });
    }, [audioUrl, cancelPlayback, playbackSettings.repeatCount, playbackSettings.speed]);

    return {audioRef, onPlayHandler};
}
