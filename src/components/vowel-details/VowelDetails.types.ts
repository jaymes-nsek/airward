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
    onReplay?: () => void
    onSlow?: () => void
}


export interface VowelProps {
    details: VowelDetails | null;
    // onToggleFavourite?: () => void;
    examples?: VowelExample[];
}
