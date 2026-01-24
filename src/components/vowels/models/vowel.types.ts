export type PronunciationDialect = 'BrE' | 'AmE'

export interface Pronunciation {
    dialect: PronunciationDialect
    ipa: string
    notes: string | null
}

export interface VowelExample {
    word: string
    pronunciations: Pronunciation[]
}

export interface VowelDetails {
    id: string
    canonicalId: number
    symbol: string
    name: string
    keyword: string
    notes?: string
    isFavorite: boolean
    examples: VowelExample[]
}
