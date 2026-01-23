import type {VowelDetails} from "../../../components/vowel-details/VowelDetails.types.ts";
import type {VowelLibraryState} from "../../pages/vowel-library-page/VowelLibraryPage.tsx";

export function getVowelFromIndex(vowelState: VowelLibraryState | null) {
    let selectedVowel: VowelDetails | null = null;

    if (vowelState?.vowels?.length) {
        selectedVowel = vowelState.vowels[vowelState.selectedIndex] ?? vowelState.vowels[0];
    }

    return selectedVowel;
}