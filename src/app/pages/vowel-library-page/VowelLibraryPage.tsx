import {useEffect, useMemo, useState} from 'react'
import {Box, type SelectChangeEvent} from '@mui/material'
import {vowelLibraryService} from '../../../services/VowelLibraryService.ts'
import {VowelDetailsCard} from '../../../components/vowels/vowel-details/vowel-details-card/VowelDetailsCard.tsx'
import {VowelList, VowelSmallWidthControls} from '../../../components/vowels/vowel-list/VowelList.tsx'
import './VowelLibraryPage.scss'
import {finalize} from "rxjs";
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
    const [isLoadingState, setIsLoadingState] = useState(true);
    const [playbackSettings, setPlaybackSettings] = useState<PlaybackSettings>(() => getStoredPlaybackSettings());

    // Derive the selected vowel strictly from "presence of vowels"
    const selectedVowel: VowelDetails | null = useMemo(() => {
        return getVowelFromIndex(vowelLibState);
    }, [vowelLibState]);

    const {audioUrl, error} = useGetVowelAudio(selectedVowel?.id);
    const {audioRef, onPlayHandler} = useVowelAudioPlayback(selectedVowel, audioUrl, playbackSettings);

    useEffect(() => {
            // console.log('effect mount');

            const subscription = vowelLibraryService
                .getVowelList()
                .pipe(finalize(() => setIsLoadingState(false))) // use finalize to make sure loading is effected in one place, on both success and failure
                .subscribe({
                    next: (response) => {

                        const vowels: VowelDetails[] = response.data.items ?? [];

                        console.log('VowelLibraryPage finished...', 'first item is:', vowels[0])

                        setVowelLibState({vowels, selectedIndex: 0});
                    },
                    error: (err) => {
                        console.error('Failed to load vowel library', err);
                    },
                });

            return () => subscription.unsubscribe();
        }, []
    )

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

    return (
        <Box component="article" className="vowel-library-page">
            <Box component="section" className="vowel-library-page__list">
                <h2 id="vowel-list-heading" className="visually-hidden">Vowel List</h2>

                <VowelList
                    className="u-fill"
                    aria-labelledby="vowel-list-heading"
                    vowels={vowelLibState.vowels}
                    selectedIndex={vowelLibState.selectedIndex}
                    isLoading={isLoadingState}
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