import {type Observable} from 'rxjs'
import {BaseService} from "./BaseService.ts";
import type {VowelDetails} from "../components/vowel-details/VowelDetails.types.ts";


const DUMMY_VOWEL_DETAILS: VowelDetails = {
    symbol: '/ɜː/',
    keyword: 'NURSE',
    isFavorite: true,
    examples: [
        {
            word: 'bird',
            pronunciations: [
                {dialect: 'BrE', ipa: '/bɜːd/'},
                {dialect: 'AmE', ipa: '/bɝːd/'},
            ],
        },
        {
            word: 'learn',
            pronunciations: [
                {dialect: 'BrE', ipa: '/lɜːn/'},
                {dialect: 'AmE', ipa: '/lɝːn/'},
            ],
        },
        {
            word: 'work',
            pronunciations: [
                {dialect: 'BrE', ipa: '/wɜːk/'},
            ],
        },
    ],
}

class VowelDetailsService extends BaseService {
    getVowelDetails(): Observable<VowelDetails> {
        return this.simulateResponse(DUMMY_VOWEL_DETAILS, 100)
    }
}

export const vowelDetailsService = new VowelDetailsService()
