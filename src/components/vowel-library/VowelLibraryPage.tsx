import {useEffect, useMemo, useState} from 'react'
import {Box} from '@mui/material'
import {vowelLibraryService} from '../../services/VowelLibraryService.ts'
import type {VowelDetails} from '../vowel-details/VowelDetails.types.ts'
import {VowelDetailsCard} from '../vowel-details/vowel-details-card/VowelDetailsCard.tsx'
import {VowelLibraryList} from './VowelLibrary.tsx'
import './VowelLibraryPage.scss'

type VowelLibraryState = {
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
        <Box className="vowel-library-page">
            <Box className="vowel-library-page__list">
                <VowelLibraryList
                    vowels={state.vowels}
                    selectedIndex={state.selectedIndex}
                    isLoading={isLoading}
                    onSelect={handleSelect}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            </Box>
            <Box className="vowel-library-page__details">
                <VowelDetailsCard />
            </Box>
        </Box>
    )
}
