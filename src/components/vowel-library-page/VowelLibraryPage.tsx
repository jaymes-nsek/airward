import {useEffect, useMemo, useState} from 'react'
import {Box} from '@mui/material'
import {vowelLibraryService} from '../../services/VowelLibraryService.ts'
import type {VowelDetails} from '../vowel-details/VowelDetails.types.ts'
import {VowelDetailsCard} from '../vowel-details/vowel-details-card/VowelDetailsCard.tsx'
import {VowelControls, VowelLibraryList} from '../vowel-library/VowelLibrary.tsx'
import './VowelLibraryPage.scss'

export type VowelLibraryState = {
    vowels: VowelDetails[]
    selectedIndex: number
}

export function VowelLibraryPage() {
    const [state, setState] = useState<VowelLibraryState>({vowels: [], selectedIndex: 0})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const subscription = vowelLibraryService.getVowelLibrary().subscribe((response) => {
            setState({vowels: response, selectedIndex: 0})
            setIsLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const selectedVowel = useMemo(() => {
        if (!state.vowels.length) {
            return null
        }

        return state.vowels[state.selectedIndex] ?? state.vowels[0]
    }, [state.selectedIndex, state.vowels])

    useEffect(() => {
        if (selectedVowel) {
            // vowelDetailsService.setVowelDetails(selectedVowel)
        }
    }, [selectedVowel])

    const handleSelect = (index: number) => {
        setState((prevState) => ({
            ...prevState,
            selectedIndex: index,
        }))
    }

    const handlePrev = () => {
        setState((prevState) => {
            const count = prevState.vowels.length
            if (!count) {
                return prevState
            }

            return {
                ...prevState,
                selectedIndex: (prevState.selectedIndex - 1 + count) % count,
            }
        })
    }

    const handleNext = () => {
        setState((prevState) => {
            const count = prevState.vowels.length
            if (!count) {
                return prevState
            }

            return {
                ...prevState,
                selectedIndex: (prevState.selectedIndex + 1) % count,
            }
        })
    }

    return (
        <Box
            component="article"
            className="vowel-library-page"
        >
            <Box
                component="section"
                className="vowel-library-page__list"
            >
                <VowelLibraryList
                    className="u-fill"
                    vowels={state.vowels}
                    selectedIndex={state.selectedIndex}
                    isLoading={isLoading}
                    onSelect={handleSelect}
                    role="listbox"
                    tabIndex={0}
                />
            </Box>

            <Box
                component="section"
                className="vowel-library-page__details-n-controls"
            >
                <VowelDetailsCard
                    className="u-fill"
                    vowel={selectedVowel}/>

                <VowelControls
                    className="vowel-library-page__controls u-fixed"
                    vowels={state.vowels}
                    onPrev={handlePrev}
                    onNext={handleNext}/>
            </Box>
        </Box>
    )
}