export type PronunciationDialects = 'BrE' | 'AmE'

export type VowelExample = {
    word: string
    pronunciations: Array<{
        dialect: PronunciationDialects
        ipa: string
    }>
}

export type VowelDetails = {
    symbol: string
    keyword: string
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