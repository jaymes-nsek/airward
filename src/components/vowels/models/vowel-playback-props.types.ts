import type {BoxProps, SelectChangeEvent} from '@mui/material'
import type {RefObject} from 'react'
import type {PlaybackSettings} from "./playback.types.ts";
import type {VowelDetails} from "./vowel.types.ts";



export type VowelBaseProps = Omit<BoxProps, 'onSelect'> & {
    selectedVowel: VowelDetails | null;
}

export type VowelControlsProps = {
    vowels: VowelDetails[]
    onPrev: () => void
    onNext: () => void
}

export type VowelListProps = Omit<BoxProps, 'onSelect'> & {
    vowels: VowelDetails[]
    selectedIndex: number
    isLoading: boolean
    onSelect: (index: number) => void
    onPlayHandler: () => void
}

export interface VowelListItemProps {
    vowel: VowelDetails
    index: number
    isSelected: boolean // What is actually selected
    isActive: boolean   // Roving highlight for aria-activedescendant navigation
    onSelect: (index: number) => void
    onPlayHandler: () => void
}

/**
 * Shared contract for components that both:
 * - control playback settings (speed/repeat), and
 * - initiate playback (audio ref + play handler).
 */
export interface VowelPlaybackBaseProps {
    playbackSettings: PlaybackSettings
    onSpeedChange: (event: SelectChangeEvent<PlaybackSettings['speed']>) => void
    onRepeatChange: (event: SelectChangeEvent<PlaybackSettings['repeatCount']>) => void

    audioRef: RefObject<HTMLAudioElement | null>
    onPlayHandler: () => void
    audioUrl: string | null
}

export interface VowelPlaybackProps extends VowelPlaybackBaseProps{
    selectedVowel: VowelDetails | null
}

export interface PlaybackSettingsPanelProps {
    settings: PlaybackSettings
    onSpeedChange: (event: SelectChangeEvent<PlaybackSettings['speed']>) => void
    onRepeatChange: (event: SelectChangeEvent<PlaybackSettings['repeatCount']>) => void
}