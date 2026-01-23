import {type RefObject, useEffect, useMemo, useRef, useState} from 'react';
import WaveSurfer from 'wavesurfer.js';
import type {WaveSurferOptions} from 'wavesurfer.js';
import {Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';

export type WaveformScrubberProps = {
    /** Must be the *same* audio element used by your play logic */
    audioRef: RefObject<HTMLAudioElement | null>;
    /** Helpful for rebuilding when the source changes */
    audioUrl: string | null;
    /** Optional: allow disabling interaction while loading */
    disabled?: boolean;
    showTime?: boolean;
};

function formatMmSs(totalSeconds: number): string {
    if (!Number.isFinite(totalSeconds) || totalSeconds < 0) {
        return '0:00';
    }
    const whole = Math.floor(totalSeconds);
    const m = Math.floor(whole / 60);
    const s = whole % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

export function WaveformScrubber({audioRef, audioUrl, disabled, showTime}: WaveformScrubberProps) {
    const theme = useTheme();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);

    const [duration, setDuration] = useState(0);

    const displayedDuration = useMemo(() => {
        // When no audio is selected, display 0:00 without mutating state in an effect.
        if (!audioUrl) {
            return 0;
        }

        return duration;
    }, [audioUrl, duration]);

    const timeLabel = useMemo(() => formatMmSs(displayedDuration), [displayedDuration]);

    useEffect(() => {
        // If we cannot bind yet, just no-op.
        if (!containerRef.current || !audioRef || !audioUrl) {
            // Cleanup if we had a previous instance
            waveSurferRef.current?.destroy();
            waveSurferRef.current = null;
            return;
        }

        // Rebuild per audioUrl change to avoid stale buffers/peaks.
        waveSurferRef.current?.destroy();
        waveSurferRef.current = null;

        const audioElement = audioRef?.current;

        if (!audioElement) {
            return;
        }

        const options: WaveSurferOptions = {
            container: containerRef.current,
            backend: 'MediaElement',
            media: audioRef.current ?? undefined,
            // Visuals (derive from MUI theme so it “respects current theming”)
            waveColor: theme.palette.action.disabled,
            progressColor: theme.palette.primary.main,
            cursorColor: theme.palette.primary.main,
            height: 44,
            barWidth: 2,
            barGap: 2,
            barRadius: 2,
            normalize: true,
            interact: !disabled,
        };

        const ws = WaveSurfer.create(options);
        waveSurferRef.current = ws;

        const isAbortError = (e: unknown) =>
            e instanceof DOMException ? e.name === 'AbortError' : (e as Error)?.name === 'AbortError'

        // Load via URL so duration/decoding is consistent.
        ws.load(audioUrl).catch((e) => {
            if (isAbortError(e)) {
                return
            }

            console.error('WaveSurfer load failed:', e)
        });

        const onReady = () => {
            const d = ws.getDuration();
            setDuration(Number.isFinite(d) ? d : 0);
        };

        // Keep duration in sync if metadata arrives later
        const onLoadedMetadata = () => {
            const d = Number.isFinite(audioElement.duration) ? audioElement.duration : 0;
            if (d > 0) {
                setDuration(d);
            }
        };

        ws.on('ready', onReady);

        audioElement.addEventListener('loadedmetadata', onLoadedMetadata);

        return () => {
            audioElement.removeEventListener('loadedmetadata', onLoadedMetadata);
            ws.un('ready', onReady);
            ws.destroy();
            waveSurferRef.current = null;
        };
    }, [audioRef, audioUrl, disabled, theme.palette.action.disabled, theme.palette.primary.main]);

    return (
        <Box className="waveform-scrubber__waveform" aria-hidden={false}>
            <Box
                className="waveform-scrubber__waveform-canvas"
                ref={containerRef}
                aria-label="Audio waveform scrubber"
            />

            {showTime && (
                <Box
                    className="waveform-scrubber__waveform-time"
                    aria-live="off"
                >
                    {timeLabel}
                </Box>
            )}
        </Box>
    );
}
