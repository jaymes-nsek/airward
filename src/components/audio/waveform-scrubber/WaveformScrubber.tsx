import './WaveformScrubber.scss'
import {memo, type RefObject, useEffect, useMemo, useRef, useState} from 'react';
import WaveSurfer from 'wavesurfer.js';
import type {WaveSurferOptions} from 'wavesurfer.js';
import {Box, type BoxProps} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import clsx from "clsx";

const WAVEFORM_H = 44;
const WAVEFORM_AND_TIME_H = 68;


/**
 * Formats a duration for visual display and accessibility.
 *
 * Visual output:
 * - Zero-padded HH:MM:SS
 * - Based on whole seconds (fractional part discarded)
 *
 * A11y label:
 * - Seconds rounded down to 2 decimal places
 *
 * @param totalSec Duration in seconds.
 */
function formatDurationHhMmSs(totalSec: number): {
    display: string;
    a11yLabel: string;
} {
    console.log('formatDuration', totalSec);

    if (!Number.isFinite(totalSec)) {
        return {
            display: '00:00:00',
            a11yLabel: '0 seconds',
        };
    }

    const clamped = Math.max(0, totalSec);

    const a11ySeconds = Math.floor(clamped * 100) / 100;
    const wholeSeconds = Math.floor(clamped);

    const h = Math.floor(wholeSeconds / 3600);
    const m = Math.floor((wholeSeconds % 3600) / 60);
    const s = wholeSeconds % 60;

    return {
        display: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
        a11yLabel: `${a11ySeconds.toFixed(2)} seconds`,
    };
}


type WaveformTimeProps = BoxProps & {
    a11yLabel: string;
};

const WaveformTimeMemo = memo(
    function WaveformTime({
                              a11yLabel,
                              ...rest
                          }: WaveformTimeProps) {
        return (
            <Box
                {...rest}
                className={clsx('waveform-scrubber__waveform-time', rest.className)}
                role="status"
                aria-label="Duration of selected vowel audio"
                aria-live="off"
                aria-relevant={'all'}
                aria-atomic="true"
            >
                {a11yLabel}
            </Box>
        );
    },
    (prevProps, nextProps) => prevProps.a11yLabel === nextProps.a11yLabel
);


export type WaveformScrubberProps = {
    /** Must be the *same* audio element used by your play logic */
    audioRef: RefObject<HTMLAudioElement | null>;
    /** Helpful for rebuilding when the source changes */
    audioUrl: string | null;
    /** Optional: allow disabling interaction while loading */
    disabled?: boolean;
    showTime?: boolean;
};

export function WaveformScrubber({audioRef, audioUrl, disabled, showTime}: WaveformScrubberProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const waveSurferRef = useRef<WaveSurfer | null>(null);
    const [duration, setDuration] = useState(0);
    const theme = useTheme();

    const {a11yLabel} = useMemo(() => {
        // When no audio is selected, display 0:00 without mutating state in an effect.
        if (!audioUrl) {
            return {
                display: '00:00:00',
                a11yLabel: '0 seconds',
            };
        }

        return formatDurationHhMmSs(duration);
    }, [audioUrl, duration]);

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
            height: WAVEFORM_H,
            barWidth: 2,
            barGap: 2,
            barRadius: 2,
            normalize: true,
            //region make waveform non-interactive (unclickable / non-draggable) while still seekable programmatically
            interact: false,
            dragToSeek: false
            //endregion
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
        <Box
            className="waveform-scrubber__waveform"
            sx={{height: WAVEFORM_AND_TIME_H}}
        >
            <Box
                className="waveform-scrubber__waveform-canvas"
                ref={containerRef}
                aria-hidden="true"
                sx={{height: WAVEFORM_H}}
            />

            {showTime &&
                <WaveformTimeMemo
                    className={'u--readonly'}
                    a11yLabel={a11yLabel}
                    aria-busy={!containerRef}/>
            }
        </Box>
    );
}
