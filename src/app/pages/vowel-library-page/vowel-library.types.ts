import type {VowelDetails} from "../../../components/vowels/models/vowel.types.ts";

export type VowelLibraryState = {
    vowels: VowelDetails[]
    selectedIndex: number
}
