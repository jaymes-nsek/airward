import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Alert, AlertTitle, Box, Button, type SelectChangeEvent} from '@mui/material'
import {vowelLibraryService} from '../../../services/VowelLibraryService.ts'
import {VowelDetailsCard} from '../../../components/vowels/vowel-details/vowel-details-card/VowelDetailsCard.tsx'
import {VowelList, VowelSmallWidthControls} from '../../../components/vowels/vowel-list/VowelList.tsx'
import './VowelLibraryPage.scss'
import {defer, Subscription} from "rxjs";
import type {VowelLibraryState} from "./vowel-library.types.ts";
import {useGetVowelAudio} from "../../../components/vowels/vowel-details/hooks/useGetVowelAudio.ts";
import {useVowelAudioPlayback} from "../../../components/vowels/vowel-details/hooks/useVowelAudioPlayback.ts";
import {
    playbackStorageKey,
    repeatCountOptions
} from "../../../components/vowels/vowel-details/vowel-action-controls/vowel-actions-controls.constants.ts";
import type {PlaybackSettings} from "../../../components/vowels/models/playback.types.ts";
import type {VowelDetails} from "../../../components/vowels/models/vowel.types.ts";
import {getVowelFromIndex} from "../../shared/utils/vowel-details.utils.ts";
import type {LoadState} from "../../shared/models/load-state.type.ts";
import {withDelayedLoading} from "../../shared/custom-rxjs/operators/withDelayedLoading.ts";

const defaultPlaybackSettings: PlaybackSettings = {
    speed: 'normal',
    repeatCount: 1,
};


function getStoredPlaybackSettings(): PlaybackSettings {
    if (typeof window === 'undefined') {
        return defaultPlaybackSettings;
    }

    const stored = window.localStorage.getItem(playbackStorageKey);

    if (!stored) {
        return defaultPlaybackSettings;
    }

    try {
        const parsed = JSON.parse(stored) as Partial<PlaybackSettings>;
        const speed = parsed.speed === 'slow' ? 'slow' : 'normal';
        const repeatCount = repeatCountOptions.includes(parsed.repeatCount as PlaybackSettings['repeatCount'])
            ? (parsed.repeatCount as PlaybackSettings['repeatCount'])
            : 1;

        return {speed, repeatCount};
    } catch (error) {
        console.warn('Unable to parse playback settings from storage.', error);
        return defaultPlaybackSettings;
    }
}


export function VowelLibraryPage() {
    const [vowelLibState, setVowelLibState] = useState<VowelLibraryState>({vowels: [], selectedIndex: 0});
    const [loadState, setLoadState] = useState<LoadState>({status: 'idle'});
    const [playbackSettings, setPlaybackSettings] = useState<PlaybackSettings>(() => getStoredPlaybackSettings());

    // Derive the selected vowel strictly from "presence of vowels"
    const selectedVowel: VowelDetails | null = useMemo(() => {
        return getVowelFromIndex(vowelLibState);
    }, [vowelLibState]);

    const {audioUrl, error} = useGetVowelAudio(selectedVowel?.id);
    const {audioRef, onPlayHandler} = useVowelAudioPlayback(selectedVowel, audioUrl, playbackSettings);

    const subscriptionRef = useRef<Subscription | null>(null);
    const MIN_SHOW_MS = 300;

    const subscribeToVowels = useCallback((delayMs: number) => {
        subscriptionRef.current?.unsubscribe();
        subscriptionRef.current = null;

        const request$ = defer(() => vowelLibraryService.getVowelList());

        subscriptionRef.current = withDelayedLoading(request$, {
            delayMs,
            minShowMs: MIN_SHOW_MS,
            onShowLoading: () => setLoadState({ status: 'loading' }),
        }).subscribe({
            next: (response) => {
                const vowels: VowelDetails[] = response.data.items ?? [];
                setVowelLibState({ vowels, selectedIndex: 0 });
                setLoadState({ status: 'success' });
            },
            error: (err) => {
                const message =
                    err instanceof Error ? err.message : 'Couldn’t load vowel library. Please try again.';

                setVowelLibState({ vowels: [], selectedIndex: 0 });
                setLoadState({ status: 'error', errorMessage: message });
            },
        });
    }, []);

    useEffect(() => {
        // Initial loadState is already {status:'idle'}; delayed commiting to loading by 100ms to avoid flicker;
        subscribeToVowels(100);

        return () => {
            subscriptionRef.current?.unsubscribe();
            subscriptionRef.current = null;
        };
    }, [subscribeToVowels]);

    if (error) {
        console.error('VowelDetailsCardContent ERR:', error);
    }

    const handleSpeedChange = (event: SelectChangeEvent<PlaybackSettings['speed']>) => {
        setPlaybackSettings((prev: PlaybackSettings) => ({
            ...prev,
            speed: event.target.value as PlaybackSettings['speed'],
        }));
    };

    const handleRepeatChange = (event: SelectChangeEvent<PlaybackSettings['repeatCount']>) => {
        const nextValue = Number(event.target.value) as PlaybackSettings['repeatCount'];

        setPlaybackSettings((prev: PlaybackSettings) => ({
            ...prev,
            repeatCount: nextValue,
        }));
    };

    //region Handlers
    const handleSelect = (index: number) => {
        setVowelLibState((prevState) => ({
            ...prevState,
            selectedIndex: index,
        }));
    };

    const handlePrev = () => {
        setVowelLibState((prevState) => {
            const count = prevState.vowels.length;

            if (!count) {
                return prevState;
            }

            return {
                ...prevState,
                selectedIndex: (prevState.selectedIndex - 1 + count) % count,
            };
        });
    };

    const handleNext = () => {
        setVowelLibState((prevState) => {
            const count = prevState.vowels.length;

            if (!count) {
                return prevState;
            }

            return {
                ...prevState,
                selectedIndex: (prevState.selectedIndex + 1) % count,
            };
        });
    };

    // Guard: list activation should not attempt to play if no URL yet.
    const handlePlay = () => {
        if (!audioUrl) {
            return;
        }

        onPlayHandler();
    };

    const handleRetry = () => {
        // Do not setLoadState manually; let the controller do it (delay 0 => immediate).
        subscribeToVowels(0);
    };

    return (
        <Box component="article" className="vowel-library-page">
            <Box component="section" className="vowel-library-page__list">
                <h2 id="vowel-list-heading" className="visually-hidden">Interactive vowel list with audio playback</h2>

                {/*NOTE: Predicator is intentionally not used to conditionally render Alert or VowelList,
                so VowelList remains in the DOM for a11y.*/}
                {loadState.status === 'error' && (
                    <Alert
                        className={'vowel-library-page__alert'}
                        severity="error"
                        variant="standard"
                        role="alert"
                        aria-atomic="true"
                        action={
                            <Button color="inherit" size="small" onClick={handleRetry}>
                                Retry
                            </Button>
                        }
                    >
                        <AlertTitle>Error</AlertTitle>
                        {'Couldn’t load vowel library. Please try again.'}
                    </Alert>
                )}

                <VowelList
                    className="u-fill"
                    aria-labelledby="vowel-list-heading"
                    vowels={vowelLibState.vowels}
                    selectedIndex={vowelLibState.selectedIndex}
                    loadState={loadState}
                    onSelect={handleSelect}
                    onPlayHandler={handlePlay}
                />
            </Box>

            <Box component="section" className="vowel-library-page__details-n-controls">
                <VowelDetailsCard
                    className="u-fill"
                    selectedVowel={selectedVowel}
                    playbackSettings={playbackSettings}
                    audioUrl={audioUrl}
                    audioRef={audioRef}
                    onPlayHandler={handlePlay}
                    onSpeedChange={handleSpeedChange}
                    onRepeatChange={handleRepeatChange}
                />

                <VowelSmallWidthControls
                    className="vowel-library-page__controls u-fixed"
                    vowels={vowelLibState.vowels}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            </Box>
        </Box>
    );
}