import {type Observable} from 'rxjs'
import {BaseService} from './BaseService.ts'
import type {VowelDetails} from '../components/vowel-details/VowelDetails.types.ts'

const DUMMY_VOWEL_LIBRARY: VowelDetails[] = [
    {
        symbol: '/iː/',
        keyword: 'FLEECE',
        isFavorite: false,
        examples: [
            {
                word: 'see',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/siː/'},
                    {dialect: 'AmE', ipa: '/siː/'},
                ],
            },
            {
                word: 'green',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/ɡriːn/'},
                ],
            },
        ],
    },
    {
        symbol: '/ɪ/',
        keyword: 'KIT',
        isFavorite: false,
        examples: [
            {
                word: 'sit',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/sɪt/'},
                    {dialect: 'AmE', ipa: '/sɪt/'},
                ],
            },
            {
                word: 'pin',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/pɪn/'},
                ],
            },
        ],
    },
    {
        symbol: '/e/',
        keyword: 'DRESS',
        isFavorite: false,
        examples: [
            {
                word: 'bed',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/bed/'},
                    {dialect: 'AmE', ipa: '/bɛd/'},
                ],
            },
            {
                word: 'check',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/tʃek/'},
                ],
            },
        ],
    },
    {
        symbol: '/æ/',
        keyword: 'TRAP',
        isFavorite: false,
        examples: [
            {
                word: 'cat',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/kæt/'},
                    {dialect: 'AmE', ipa: '/kæt/'},
                ],
            },
            {
                word: 'map',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/mæp/'},
                ],
            },
        ],
    },
    {
        symbol: '/ɑː/',
        keyword: 'PALM',
        isFavorite: false,
        examples: [
            {
                word: 'arm',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/ɑːm/'},
                    {dialect: 'AmE', ipa: '/ɑːrm/'},
                ],
            },
            {
                word: 'start',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/stɑːt/'},
                ],
            },
        ],
    },
    {
        symbol: '/ɒ/',
        keyword: 'LOT',
        isFavorite: false,
        examples: [
            {
                word: 'hot',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/hɒt/'},
                ],
            },
            {
                word: 'dog',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/dɒɡ/'},
                ],
            },
        ],
    },
    {
        symbol: '/ɔː/',
        keyword: 'THOUGHT',
        isFavorite: false,
        examples: [
            {
                word: 'law',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/lɔː/'},
                    {dialect: 'AmE', ipa: '/lɔː/'},
                ],
            },
            {
                word: 'talk',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/tɔːk/'},
                ],
            },
        ],
    },
    {
        symbol: '/ʊ/',
        keyword: 'FOOT',
        isFavorite: false,
        examples: [
            {
                word: 'book',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/bʊk/'},
                    {dialect: 'AmE', ipa: '/bʊk/'},
                ],
            },
            {
                word: 'good',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/ɡʊd/'},
                ],
            },
        ],
    },
    {
        symbol: '/uː/',
        keyword: 'GOOSE',
        isFavorite: false,
        examples: [
            {
                word: 'goose',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/ɡuːs/'},
                    {dialect: 'AmE', ipa: '/ɡuːs/'},
                ],
            },
            {
                word: 'move',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/muːv/'},
                ],
            },
        ],
    },
    {
        symbol: '/ʌ/',
        keyword: 'STRUT',
        isFavorite: false,
        examples: [
            {
                word: 'cup',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/kʌp/'},
                    {dialect: 'AmE', ipa: '/kʌp/'},
                ],
            },
            {
                word: 'luck',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/lʌk/'},
                ],
            },
        ],
    },
    {
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
        ],
    },
    {
        symbol: '/ə/',
        keyword: 'COMMA',
        isFavorite: false,
        examples: [
            {
                word: 'about',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/əˈbaʊt/'},
                    {dialect: 'AmE', ipa: '/əˈbaʊt/'},
                ],
            },
            {
                word: 'sofa',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/ˈsəʊfə/'},
                ],
            },
        ],
    },
    {
        symbol: '/eɪ/',
        keyword: 'FACE',
        isFavorite: false,
        examples: [
            {
                word: 'day',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/deɪ/'},
                    {dialect: 'AmE', ipa: '/deɪ/'},
                ],
            },
            {
                word: 'rain',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/reɪn/'},
                ],
            },
        ],
    },
    {
        symbol: '/aɪ/',
        keyword: 'PRICE',
        isFavorite: false,
        examples: [
            {
                word: 'my',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/maɪ/'},
                    {dialect: 'AmE', ipa: '/maɪ/'},
                ],
            },
            {
                word: 'time',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/taɪm/'},
                ],
            },
        ],
    },
    {
        symbol: '/ɔɪ/',
        keyword: 'CHOICE',
        isFavorite: false,
        examples: [
            {
                word: 'boy',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/bɔɪ/'},
                    {dialect: 'AmE', ipa: '/bɔɪ/'},
                ],
            },
            {
                word: 'join',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/dʒɔɪn/'},
                ],
            },
        ],
    },
    {
        symbol: '/aʊ/',
        keyword: 'MOUTH',
        isFavorite: false,
        examples: [
            {
                word: 'now',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/naʊ/'},
                    {dialect: 'AmE', ipa: '/naʊ/'},
                ],
            },
            {
                word: 'loud',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/laʊd/'},
                ],
            },
        ],
    },
    {
        symbol: '/əʊ/',
        keyword: 'GOAT',
        isFavorite: false,
        examples: [
            {
                word: 'home',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/həʊm/'},
                ],
            },
            {
                word: 'go',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/ɡəʊ/'},
                    {dialect: 'AmE', ipa: '/ɡoʊ/'},
                ],
            },
        ],
    },
    {
        symbol: '/ɪə/',
        keyword: 'NEAR',
        isFavorite: false,
        examples: [
            {
                word: 'ear',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/ɪə/'},
                ],
            },
            {
                word: 'cheer',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/tʃɪə/'},
                ],
            },
        ],
    },
    {
        symbol: '/eə/',
        keyword: 'SQUARE',
        isFavorite: false,
        examples: [
            {
                word: 'hair',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/heə/'},
                ],
            },
            {
                word: 'care',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/keə/'},
                ],
            },
        ],
    },
    {
        symbol: '/ʊə/',
        keyword: 'CURE',
        isFavorite: false,
        examples: [
            {
                word: 'tour',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/tʊə/'},
                ],
            },
            {
                word: 'pure',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/pjʊə/'},
                ],
            },
        ],
    },
]

class VowelLibraryService extends BaseService {
    getVowelLibrary(): Observable<VowelDetails[]> {
        return this.simulateResponse(DUMMY_VOWEL_LIBRARY, 100)
    }
}

export const vowelLibraryService = new VowelLibraryService()
