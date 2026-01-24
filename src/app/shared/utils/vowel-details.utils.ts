import type {VowelLibraryState} from "../../pages/vowel-library-page/vowel-library.types.ts";
import type {VowelDetails} from "../../../components/vowels/models/vowel.types.ts";


export function getVowelFromIndex(vowelState: VowelLibraryState | null) {
    let selectedVowel: VowelDetails | null = null;

    if (vowelState?.vowels?.length) {
        selectedVowel = vowelState.vowels[vowelState.selectedIndex] ?? vowelState.vowels[0];
    }

    return selectedVowel;
}