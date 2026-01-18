import {type RefObject, useCallback, useRef} from "react";
import type {VowelDetails} from "../VowelDetails.types.ts";


export interface UseVowelAudioPlaybackResult {
    audioRef: RefObject<HTMLAudioElement | null>;
    onPlayHandler: () => void;
}

export function useVowelAudioPlayback(
    selectedVowel: VowelDetails | null,
    audioUrl: string | null,
): UseVowelAudioPlaybackResult {
    const audioRef = useRef<HTMLAudioElement>(null);

    const onPlayHandler = useCallback((): void => {
            if (!selectedVowel && !audioUrl) {
                return;
            }

            const audioEl = audioRef.current;

            if (!audioEl) {
                return;
            }

            // Defensive reset: to ensure replay always starts from the beginning
            //  - Avoids "already playing" edge cases in Firefox/Safari
            audioEl.pause();
            audioEl.currentTime = 0;

            void audioEl.play().catch((err: unknown) => {
                // Browsers can reject play() if not user-initiated
                // This handler *is* user-initiated, so this is mostly for diagnostics
                console.error("Audio playback failed:", err);
            });
        }, [selectedVowel, audioUrl]
    );

    return {audioRef, onPlayHandler};
}
