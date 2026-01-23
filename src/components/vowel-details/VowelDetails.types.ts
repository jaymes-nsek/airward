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

export type VowelActionControlsProps = {
    onPlay?: () => void
}


export interface VowelProps {
    details: VowelDetails | null;
    // onToggleFavourite?: () => void;
    examples?: VowelExample[];
}

export type PlaybackSettings = {
    speed: 'normal' | 'slow'
    repeatCount: 1 | 2 | 3 | 4 | 5
}
