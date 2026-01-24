import {useEffect, useState} from 'react'
import {Box} from '@mui/material'
import {vowelLibraryService} from '../../../services/VowelLibraryService.ts'
import type {VowelDetails} from '../../../components/vowel-details/VowelDetails.types.ts'
import {VowelDetailsCard} from '../../../components/vowel-details/vowel-details-card/VowelDetailsCard.tsx'
import {VowelSmallWidthControls, VowelList} from '../../../components/vowel-list/VowelList.tsx'
import './VowelLibraryPage.scss'
import {finalize} from "rxjs";
import type {VowelLibraryState} from "./vowel-library.types.ts";


export function VowelLibraryPage() {
    const [vowelLibState, setVowelLibState] = useState<VowelLibraryState>({vowels: [], selectedIndex: 0})
    const [isLoadingState, setIsLoadingState] = useState(true)

    useEffect(() => {
        // console.log('effect mount');

        const subscription = vowelLibraryService
            .getVowelList()
            .pipe(finalize(() => setIsLoadingState(false))) // use finalize to make sure loading is effected in one place, on both success and failure
            .subscribe({
                next: (response) => {

                    const vowels: VowelDetails[] = response.data.items ?? [];

                    console.log('VowelLibraryPage finished...', 'first item is:', vowels[0])

                    setVowelLibState({vowels, selectedIndex: 0});
                },
                error: (err) => {
                    console.error('Failed to load vowel library', err);
                    // setError(...)  ?
                },
            });

        return () => {
            // console.log('effect cleanup: unsubscribe');
            subscription.unsubscribe()
        }
    }, [])

    //region Handlers
    const handleSelect = (index: number) => {
        setVowelLibState((prevState) => ({
            ...prevState,
            selectedIndex: index,
        }))
    }

    const handlePrev = () => {
        setVowelLibState((prevState) => {
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
        setVowelLibState((prevState) => {
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
    //endregion

    return (
        <Box
            component="article"
            className="vowel-library-page"
        >
            <Box
                component="section"
                className="vowel-library-page__list"
            >
                <VowelList
                    className="u-fill"
                    vowels={vowelLibState.vowels}
                    selectedIndex={vowelLibState.selectedIndex}
                    isLoading={isLoadingState}
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
                    vowelState={vowelLibState}/>

                <VowelSmallWidthControls
                    className="vowel-library-page__controls u-fixed"
                    vowels={vowelLibState.vowels}
                    onPrev={handlePrev}
                    onNext={handleNext}/>
            </Box>
        </Box>
    )
}