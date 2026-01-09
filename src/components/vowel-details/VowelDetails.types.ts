export type PronunciationDialects = 'BrE' | 'AmE'

export type VowelExample = {
    word: string
    pronunciations: Array<{
        dialect: PronunciationDialects
        ipa: string
        notes: string | null
    }>
}

export type VowelDetails = {
    id: string
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