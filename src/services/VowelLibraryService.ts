import {type Observable} from 'rxjs'
import {BaseService} from './BaseService.ts'
import type {VowelDetails} from '../components/vowel-details/VowelDetails.types.ts'

const DUMMY_VOWEL_LIBRARY: VowelDetails[] = [
    {
        id: "_1_vowel_i_long",
        symbol: "/iː/",
        keyword: "FLEECE",
        notes: "i long",
        isFavorite: false,
        examples: [
            {
                word: "see",
                pronunciations: [
                    {dialect: "BrE", ipa: "/siː/"},
                    {dialect: "AmE", ipa: "/siː/"}
                ]
            },
            {
                word: "green",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ɡriːn/"}
                ]
            }
        ]
    },

    {
        id: "_2_vowel_i_short",
        symbol: "/ɪ/",
        keyword: "KIT",
        notes: "i short",
        isFavorite: false,
        examples: [
            {
                word: "sit",
                pronunciations: [
                    {dialect: "BrE", ipa: "/sɪt/"},
                    {dialect: "AmE", ipa: "/sɪt/"}
                ]
            },
            {
                word: "busy",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈbɪzi/"}
                ]
            }
        ]
    },

    {
        id: "_3_vowel_e",
        symbol: "/e/",
        keyword: "DRESS",
        notes: "e",
        isFavorite: false,
        examples: [
            {
                word: "bed",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bed/"},
                    {dialect: "AmE", ipa: "/bɛd/"}
                ]
            },
            {
                word: "head",
                pronunciations: [
                    {dialect: "BrE", ipa: "/hed/"}
                ]
            }
        ]
    },

    {
        id: "_4_vowel_ae",
        symbol: "/æ/",
        keyword: "TRAP",
        notes: "ae",
        isFavorite: false,
        examples: [
            {
                word: "cat",
                pronunciations: [
                    {dialect: "BrE", ipa: "/kæt/"},
                    {dialect: "AmE", ipa: "/kæt/"}
                ]
            },
            {
                word: "happy",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈhæpi/"}
                ]
            }
        ]
    },

    {
        id: "_5_vowel_schwa",
        symbol: "/ə/",
        keyword: "SCHWA",
        notes: "schwa",
        isFavorite: false,
        examples: [
            {
                word: "about",
                pronunciations: [
                    {dialect: "BrE", ipa: "/əˈbaʊt/"},
                    {dialect: "AmE", ipa: "/əˈbaʊt/"}
                ]
            },
            {
                word: "teacher",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈtiːtʃə/"}
                ]
            }
        ]
    },

    {
        id: "_6_vowel_v",
        symbol: "/ʌ/",
        keyword: "STRUT",
        notes: "v",
        isFavorite: false,
        examples: [
            {
                word: "cup",
                pronunciations: [
                    {dialect: "BrE", ipa: "/kʌp/"},
                    {dialect: "AmE", ipa: "/kʌp/"}
                ]
            },
            {
                word: "love",
                pronunciations: [
                    {dialect: "BrE", ipa: "/lʌv/"}
                ]
            }
        ]
    },

    {
        id: "_7_vowel_3_long",
        symbol: "/ɜː/",
        keyword: "NURSE",
        notes: "3 long",
        isFavorite: false,
        examples: [
            {
                word: "bird",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bɜːd/"},
                    {dialect: "AmE", ipa: "/bɝd/"}
                ]
            },
            {
                word: "learn",
                pronunciations: [
                    {dialect: "BrE", ipa: "/lɜːn/"}
                ]
            }
        ]
    },

    {
        id: "_8_vowel_a_long",
        symbol: "/ɑː/",
        keyword: "PALM",
        notes: "a long",
        isFavorite: false,
        examples: [
            {
                word: "father",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈfɑːðə/"},
                    {dialect: "AmE", ipa: "/ˈfɑðɚ/"}
                ]
            },
            {
                word: "calm",
                pronunciations: [
                    {dialect: "BrE", ipa: "/kɑːm/"}
                ]
            }
        ]
    },

    {
        id: "_9_vowel_o_short",
        symbol: "/ɒ/",
        keyword: "LOT",
        notes: "o short (a-flipped)",
        isFavorite: false,
        examples: [
            {
                word: "hot",
                pronunciations: [
                    {dialect: "BrE", ipa: "/hɒt/"}
                ]
            },
            {
                word: "watch",
                pronunciations: [
                    {dialect: "BrE", ipa: "/wɒtʃ/"}
                ]
            }
        ]
    },

    {
        id: "_10_vowel_o_long",
        symbol: "/ɔː/",
        keyword: "THOUGHT",
        notes: "o long",
        isFavorite: false,
        examples: [
            {
                word: "law",
                pronunciations: [
                    {dialect: "BrE", ipa: "/lɔː/"},
                    {dialect: "AmE", ipa: "/lɔ/"}
                ]
            },
            {
                word: "north",
                pronunciations: [
                    {dialect: "BrE", ipa: "/nɔːθ/"}
                ]
            }
        ]
    },

    {
        id: "_11_vowel_u_short",
        symbol: "/ʊ/",
        keyword: "FOOT",
        notes: "u short (horse shoe)",
        isFavorite: false,
        examples: [
            {
                word: "book",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bʊk/"},
                    {dialect: "AmE", ipa: "/bʊk/"}
                ]
            },
            {
                word: "good",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ɡʊd/"}
                ]
            }
        ]
    },

    {
        id: "_12_vowel_u_long",
        symbol: "/uː/",
        keyword: "GOOSE",
        notes: "u long",
        isFavorite: false,
        examples: [
            {
                word: "food",
                pronunciations: [
                    {dialect: "BrE", ipa: "/fuːd/"},
                    {dialect: "AmE", ipa: "/fuːd/"}
                ]
            },
            {
                word: "blue",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bluː/"}
                ]
            }
        ]
    },

    {
        id: "_13_vowel_ia",
        symbol: "/ɪə/",
        keyword: "NEAR",
        notes: "i_schwa",
        isFavorite: false,
        examples: [
            {
                word: "here",
                pronunciations: [
                    {dialect: "BrE", ipa: "/hɪə/"}
                ]
            },
            {
                word: "idea",
                pronunciations: [
                    {dialect: "BrE", ipa: "/aɪˈdɪə/"}
                ]
            }
        ]
    },

    {
        id: "_14_vowel_ea",
        symbol: "/eə/",
        keyword: "SQUARE",
        notes: "e_schwa",
        isFavorite: false,
        examples: [
            {
                word: "care",
                pronunciations: [
                    {dialect: "BrE", ipa: "/keə/"}
                ]
            },
            {
                word: "fair",
                pronunciations: [
                    {dialect: "BrE", ipa: "/feə/"}
                ]
            }
        ]
    },

    {
        id: "_15_vowel_ua",
        symbol: "/ʊə/",
        keyword: "CURE",
        notes: "u-hs_schwa",
        isFavorite: false,
        examples: [
            {
                word: "tour",
                pronunciations: [
                    {dialect: "BrE", ipa: "/tʊə/"}
                ]
            },
            {
                word: "pure",
                pronunciations: [
                    {dialect: "BrE", ipa: "/pjʊə/"}
                ]
            }
        ]
    },

    {
        id: "_16_vowel_ei",
        symbol: "/eɪ/",
        keyword: "FACE",
        notes: "ei",
        isFavorite: false,
        examples: [
            {
                word: "day",
                pronunciations: [
                    {dialect: "BrE", ipa: "/deɪ/"},
                    {dialect: "AmE", ipa: "/deɪ/"}
                ]
            },
            {
                word: "rain",
                pronunciations: [
                    {dialect: "BrE", ipa: "/reɪn/"}
                ]
            }
        ]
    },

    {
        id: "_17_vowel_ai",
        symbol: "/aɪ/",
        keyword: "PRICE",
        notes: "ai",
        isFavorite: false,
        examples: [
            {
                word: "time",
                pronunciations: [
                    {dialect: "BrE", ipa: "/taɪm/"},
                    {dialect: "AmE", ipa: "/taɪm/"}
                ]
            },
            {
                word: "eye",
                pronunciations: [
                    {dialect: "BrE", ipa: "/aɪ/"}
                ]
            }
        ]
    },

    {
        id: "_18_vowel_oi",
        symbol: "/ɔɪ/",
        keyword: "CHOICE",
        notes: "inverted-C_i",
        isFavorite: false,
        examples: [
            {
                word: "boy",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bɔɪ/"},
                    {dialect: "AmE", ipa: "/bɔɪ/"}
                ]
            },
            {
                word: "voice",
                pronunciations: [
                    {dialect: "BrE", ipa: "/vɔɪs/"}
                ]
            }
        ]
    },

    {
        id: "_19_vowel_ou",
        symbol: "/əʊ/",
        keyword: "GOAT",
        notes: "schwa_u-hs",
        isFavorite: false,
        examples: [
            {
                word: "go",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ɡəʊ/"},
                    {dialect: "AmE", ipa: "/ɡoʊ/"}
                ]
            },
            {
                word: "home",
                pronunciations: [
                    {dialect: "BrE", ipa: "/həʊm/"}
                ]
            }
        ]
    },

    {
        id: "_20_vowel_au",
        symbol: "/aʊ/",
        keyword: "MOUTH",
        notes: "a_u-hs",
        isFavorite: false,
        examples: [
            {
                word: "now",
                pronunciations: [
                    {dialect: "BrE", ipa: "/naʊ/"},
                    {dialect: "AmE", ipa: "/naʊ/"}
                ]
            },
            {
                word: "house",
                pronunciations: [
                    {dialect: "BrE", ipa: "/haʊs/"}
                ]
            }
        ]
    }
]

class VowelLibraryService extends BaseService {
    getVowelLibrary(): Observable<VowelDetails[]> {
        return this.simulateResponse(DUMMY_VOWEL_LIBRARY, 100)
    }
}

export const vowelLibraryService = new VowelLibraryService()
