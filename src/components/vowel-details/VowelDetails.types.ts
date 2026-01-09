export type PronunciationDialects = 'BrE' | 'AmE'

export type VowelExample = {
    word: string
    pronunciations: Array<{
        dialect: PronunciationDialects
        ipa: string
    }>
}

export type VowelDetails = {
    id: string
    symbol: string
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