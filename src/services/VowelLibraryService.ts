import {type Observable} from 'rxjs'
import {BaseService} from './BaseService.ts'
import type {VowelDetails} from '../components/vowel-details/VowelDetails.types.ts'

const DUMMY_VOWEL_LIBRARY: VowelDetails[] = [
    {
        id: "_1_vowel_i_long",
        name: "vowel ee long",
        symbol: "/iː/",
        keyword: "FLEECE",
        notes: "i long",
        isFavorite: false,
        examples: [
            {
                word: "see",
                pronunciations: [
                    {dialect: "BrE", ipa: "/siː/", notes: null},
                    {dialect: "AmE", ipa: "/siː/", notes: null}
                ]
            },
            {
                word: "green",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ɡriːn/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_2_vowel_i_short",
        name: "vowel i short",
        symbol: "/ɪ/",
        keyword: "KIT",
        notes: "i short",
        isFavorite: false,
        examples: [
            {
                word: "sit",
                pronunciations: [
                    {dialect: "BrE", ipa: "/sɪt/", notes: null},
                    {dialect: "AmE", ipa: "/sɪt/", notes: null}
                ]
            },
            {
                word: "busy",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈbɪzi/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_3_vowel_e",
        name: "vowel e",
        symbol: "/e/",
        keyword: "DRESS",
        notes: "e",
        isFavorite: false,
        examples: [
            {
                word: "bed",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bed/", notes: null},
                    {dialect: "AmE", ipa: "/bɛd/", notes: null}
                ]
            },
            {
                word: "head",
                pronunciations: [
                    {dialect: "BrE", ipa: "/hed/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_4_vowel_ae",
        name: "vowel a as in cat",
        symbol: "/æ/",
        keyword: "TRAP",
        notes: "ae",
        isFavorite: false,
        examples: [
            {
                word: "cat",
                pronunciations: [
                    {dialect: "BrE", ipa: "/kæt/", notes: null},
                    {dialect: "AmE", ipa: "/kæt/", notes: null}
                ]
            },
            {
                word: "happy",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈhæpi/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_5_vowel_schwa",
        name: "vowel schwa",
        symbol: "/ə/",
        keyword: "SCHWA",
        notes: "schwa",
        isFavorite: false,
        examples: [
            {
                word: "about",
                pronunciations: [
                    {dialect: "BrE", ipa: "/əˈbaʊt/", notes: null},
                    {dialect: "AmE", ipa: "/əˈbaʊt/", notes: null}
                ]
            },
            {
                word: "teacher",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈtiːtʃə/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_6_vowel_v",
        name: "vowel uh as in cup",
        symbol: "/ʌ/",
        keyword: "STRUT",
        notes: "v",
        isFavorite: false,
        examples: [
            {
                word: "cup",
                pronunciations: [
                    {dialect: "BrE", ipa: "/kʌp/", notes: null},
                    {dialect: "AmE", ipa: "/kʌp/", notes: null}
                ]
            },
            {
                word: "love",
                pronunciations: [
                    {dialect: "BrE", ipa: "/lʌv/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_7_vowel_3_long",
        name: "vowel er long",
        symbol: "/ɜː/",
        keyword: "NURSE",
        notes: "3 long",
        isFavorite: false,
        examples: [
            {
                word: "bird",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bɜːd/", notes: null},
                    {dialect: "AmE", ipa: "/bɝd/", notes: null}
                ]
            },
            {
                word: "learn",
                pronunciations: [
                    {dialect: "BrE", ipa: "/lɜːn/", notes: null}
                ]
            },
            {
                word: 'work',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/wɜːk/', notes: null},
                ],
            },
            {
                word: 'third',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/θɜːd/', notes: null},
                    {dialect: 'AmE', ipa: '/θɝːd/', notes: null},
                ],
            },
            {
                word: 'turn',
                pronunciations: [
                    {dialect: 'BrE', ipa: '/tɜːn/', notes: null},
                ],
            }
        ]
    },

    {
        id: "_8_vowel_a_long",
        name: "vowel ah long",
        symbol: "/ɑː/",
        keyword: "PALM",
        notes: "a long",
        isFavorite: false,
        examples: [
            {
                word: "father",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ˈfɑːðə/", notes: null},
                    {dialect: "AmE", ipa: "/ˈfɑðɚ/", notes: null}
                ]
            },
            {
                word: "calm",
                pronunciations: [
                    {dialect: "BrE", ipa: "/kɑːm/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_9_vowel_o_short",
        name: "vowel o short",
        symbol: "/ɒ/",
        keyword: "LOT",
        notes: "o short (a-flipped)",
        isFavorite: false,
        examples: [
            {
                word: "hot",
                pronunciations: [
                    {dialect: "BrE", ipa: "/hɒt/", notes: null}
                ]
            },
            {
                word: "watch",
                pronunciations: [
                    {dialect: "BrE", ipa: "/wɒtʃ/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_10_vowel_o_long",
        name: "vowel aw long",
        symbol: "/ɔː/",
        keyword: "THOUGHT",
        notes: "o long",
        isFavorite: false,
        examples: [
            {
                word: "law",
                pronunciations: [
                    {dialect: "BrE", ipa: "/lɔː/", notes: null},
                    {dialect: "AmE", ipa: "/lɔ/", notes: null}
                ]
            },
            {
                word: "north",
                pronunciations: [
                    {dialect: "BrE", ipa: "/nɔːθ/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_11_vowel_u_short",
        name: "vowel oo short",
        symbol: "/ʊ/",
        keyword: "FOOT",
        notes: "u short (horse shoe)",
        isFavorite: false,
        examples: [
            {
                word: "book",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bʊk/", notes: null},
                    {dialect: "AmE", ipa: "/bʊk/", notes: null}
                ]
            },
            {
                word: "good",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ɡʊd/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_12_vowel_u_long",
        name: "vowel oo long",
        symbol: "/uː/",
        keyword: "GOOSE",
        notes: "u long",
        isFavorite: false,
        examples: [
            {
                word: "food",
                pronunciations: [
                    {dialect: "BrE", ipa: "/fuːd/", notes: null},
                    {dialect: "AmE", ipa: "/fuːd/", notes: null}
                ]
            },
            {
                word: "blue",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bluː/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_13_vowel_ia",
        name: "vowel ear as in here",
        symbol: "/ɪə/",
        keyword: "NEAR",
        notes: "i_schwa",
        isFavorite: false,
        examples: [
            {
                word: "here",
                pronunciations: [
                    {dialect: "BrE", ipa: "/hɪə/", notes: null}
                ]
            },
            {
                word: "idea",
                pronunciations: [
                    {dialect: "BrE", ipa: "/aɪˈdɪə/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_14_vowel_ea",
        name: "vowel air as in care",
        symbol: "/eə/",
        keyword: "SQUARE",
        notes: "e_schwa",
        isFavorite: false,
        examples: [
            {
                word: "care",
                pronunciations: [
                    {dialect: "BrE", ipa: "/keə/", notes: null}
                ]
            },
            {
                word: "fair",
                pronunciations: [
                    {dialect: "BrE", ipa: "/feə/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_15_vowel_ua",
        name: "vowel oor as in tour",
        symbol: "/ʊə/",
        keyword: "CURE",
        notes: "u-hs_schwa",
        isFavorite: false,
        examples: [
            {
                word: "tour",
                pronunciations: [
                    {dialect: "BrE", ipa: "/tʊə/", notes: null}
                ]
            },
            {
                word: "pure",
                pronunciations: [
                    {dialect: "BrE", ipa: "/pjʊə/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_16_vowel_ei",
        name: "vowel ay as in day",
        symbol: "/eɪ/",
        keyword: "FACE",
        notes: "ei",
        isFavorite: false,
        examples: [
            {
                word: "day",
                pronunciations: [
                    {dialect: "BrE", ipa: "/deɪ/", notes: null},
                    {dialect: "AmE", ipa: "/deɪ/", notes: null}
                ]
            },
            {
                word: "rain",
                pronunciations: [
                    {dialect: "BrE", ipa: "/reɪn/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_17_vowel_ai",
        name: "vowel eye as in time",
        symbol: "/aɪ/",
        keyword: "PRICE",
        notes: "ai",
        isFavorite: false,
        examples: [
            {
                word: "time",
                pronunciations: [
                    {dialect: "BrE", ipa: "/taɪm/", notes: null},
                    {dialect: "AmE", ipa: "/taɪm/", notes: null}
                ]
            },
            {
                word: "eye",
                pronunciations: [
                    {dialect: "BrE", ipa: "/aɪ/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_18_vowel_oi",
        name: "vowel oy as in boy",
        symbol: "/ɔɪ/",
        keyword: "CHOICE",
        notes: "inverted-C_i",
        isFavorite: false,
        examples: [
            {
                word: "boy",
                pronunciations: [
                    {dialect: "BrE", ipa: "/bɔɪ/", notes: null},
                    {dialect: "AmE", ipa: "/bɔɪ/", notes: null}
                ]
            },
            {
                word: "voice",
                pronunciations: [
                    {dialect: "BrE", ipa: "/vɔɪs/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_19_vowel_ou",
        name: "vowel oh as in go",
        symbol: "/əʊ/",
        keyword: "GOAT",
        notes: "schwa_u-hs",
        isFavorite: false,
        examples: [
            {
                word: "go",
                pronunciations: [
                    {dialect: "BrE", ipa: "/ɡəʊ/", notes: null},
                    {dialect: "AmE", ipa: "/ɡoʊ/", notes: null}
                ]
            },
            {
                word: "home",
                pronunciations: [
                    {dialect: "BrE", ipa: "/həʊm/", notes: null}
                ]
            }
        ]
    },

    {
        id: "_20_vowel_au",
        name: "vowel ow as in now",
        symbol: "/aʊ/",
        keyword: "MOUTH",
        notes: "a_u-hs",
        isFavorite: false,
        examples: [
            {
                word: "now",
                pronunciations: [
                    {dialect: "BrE", ipa: "/naʊ/", notes: null},
                    {dialect: "AmE", ipa: "/naʊ/", notes: null}
                ]
            },
            {
                word: "house",
                pronunciations: [
                    {dialect: "BrE", ipa: "/haʊs/", notes: null}
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