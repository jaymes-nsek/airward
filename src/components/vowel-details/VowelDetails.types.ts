import type {CardProps, SelectChangeEvent} from "@mui/material";
import type {VowelLibraryState} from "../../app/pages/vowel-library-page/vowel-library.types.ts";


export type PronunciationDialects = 'BrE' | 'AmE'

export interface Pronunciation {
    dialect: PronunciationDialects;
    ipa: string;
    notes: string | null;
}


export type VowelExample = {
    word: string
    pronunciations: Pronunciation[]
}

export type VowelDetails = {
    id: string
    canonicalId: number;
    symbol: string
    name: string
    keyword: string
    notes?: string;
    isFavorite: boolean
    examples: VowelExample[]
}

export interface VowelStateProps {
    vowelState: VowelLibraryState | null;
}

export type VowelDetailsCardProps = CardProps & VowelStateProps;

export type PlaybackSettingsPanelProps = {
    settings: PlaybackSettings
    onSpeedChange: (event: SelectChangeEvent<PlaybackSettings['speed']>) => void
    onRepeatChange: (event: SelectChangeEvent<PlaybackSettings['repeatCount']>) => void
}


export type PlaybackSettings = {
    speed: 'normal' | 'slow'
    repeatCount: 1 | 2 | 3 | 4 | 5
}
