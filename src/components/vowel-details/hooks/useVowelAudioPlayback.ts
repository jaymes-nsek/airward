import {type RefObject, useCallback, useRef} from "react";
import type {PlaybackSettings, VowelDetails} from "../VowelDetails.types.ts";


export interface UseVowelAudioPlaybackResult {
    audioRef: RefObject<HTMLAudioElement | null>;
    onPlayHandler: () => void;
}

export function useVowelAudioPlayback(
    selectedVowel: VowelDetails | null,
    audioUrl: string | null,
    playbackSettings: PlaybackSettings,
): UseVowelAudioPlaybackResult {
    const audioRef = useRef<HTMLAudioElement>(null);

    // Promise-based delay for introducing pause between looped replays (i.e. repeat modifier >1)
    const delay = (ms: number) =>
        new Promise<void>(resolve => setTimeout(resolve, ms));

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
            audioEl.onended = null;
            audioEl.playbackRate = playbackSettings.speed === 'slow' ? 0.5 : 1;

            if (playbackSettings.repeatCount > 1) {
                let remaining = playbackSettings.repeatCount;

                audioEl.onended = async () => {
                    remaining -= 1;

                    if (remaining > 0) {
                        await delay(500);

                        audioEl.currentTime = 0;
                        void audioEl.play();
                    } else {
                        audioEl.onended = null;
                    }
                };
            }

            void audioEl.play().catch((err: unknown) => {
                // Browsers can reject play() if not user-initiated
                // This handler *is* user-initiated, so this is mostly for diagnostics
                console.error("Audio playback failed:", err);
            });
        }, [selectedVowel, audioUrl, playbackSettings]
    );

    return {audioRef, onPlayHandler};
}
