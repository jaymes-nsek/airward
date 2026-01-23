import {Box, type BoxProps, Button, CircularProgress, Typography} from '@mui/material'
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded'
import type {VowelDetails} from '../vowel-details/VowelDetails.types.ts'
import './VowelList.scss'
import {useListboxNavigation} from "../../app/shared/a11y/useListboxNavigation.ts";
import {getVowelOptionId} from "../../app/shared/a11y/listboxIds.ts";
import clsx from "clsx";

export type VowelBaseProps = Omit<BoxProps, 'onSelect'> & {
    vowels: VowelDetails[]
}

export type VowelControlsProps = VowelBaseProps & {
    onPrev: () => void
    onNext: () => void
}

export type VowelLibraryListProps = VowelBaseProps & {
    selectedIndex: number
    isLoading: boolean
    onSelect: (index: number) => void
}


export function VowelControls({
                                  vowels,
                                  onPrev,
                                  onNext,
                                  ...rest
                              }: VowelControlsProps) {
    return (
        <Box className="vowel-library__controls" {...rest}>
            <Button
                className="vowel-library__control"
                variant="outlined"
                startIcon={<ArrowBackIosNewRounded/>}
                onClick={onPrev}
                disabled={!vowels.length}
            >
                Prev
            </Button>
            <Button
                className="vowel-library__control"
                variant="outlined"
                endIcon={<ArrowForwardIosRounded/>}
                onClick={onNext}
                disabled={!vowels.length}
            >
                Next
            </Button>
        </Box>
    )
}

export function VowelList({
                                     vowels,
                                     selectedIndex,
                                     isLoading,
                                     onSelect,
                                     ...rest
                                 }: VowelLibraryListProps) {
    const count = vowels.length

    const {safeSelectedIndex, onKeyDown} = useListboxNavigation({
        count,
        selectedIndex,
        onSelect,
        wrap: true,
        confirmOnSpaceEnter: false,
    })

    const activeDescendant =
        safeSelectedIndex >= 0 ? getVowelOptionId(vowels[safeSelectedIndex].id) : undefined

    return (
        <Box className="vowel-library"
             role="listbox"
             tabIndex={0}
             aria-label="Vowel library"
             aria-activedescendant={activeDescendant}
             aria-busy={isLoading || undefined}
             onKeyDown={onKeyDown}
             {...rest}
        >
            {isLoading ? (
                <Box className="vowel-library__loading">
                    <CircularProgress size={28}/>
                    <Typography variant="body2">Loading vowels...</Typography>
                </Box>
            ) : (
                <>
                    <Box className="vowel-library__grid">
                        {vowels.map((vowel, index) => {
                            const isSelected = index === safeSelectedIndex

                            return (
                                <Button
                                    key={vowel.id}
                                    id={getVowelOptionId(vowel.id)}
                                    role="option"
                                    aria-selected={isSelected}
                                    aria-label={vowel.name}
                                    tabIndex={-1} // critical: only the listbox is tabbable
                                    className={clsx(
                                        'vowel-library__item',
                                        index === selectedIndex && 'vowel-library__item--active'
                                    )}
                                    variant={index === selectedIndex ? 'contained' : 'outlined'}
                                    color={index === selectedIndex ? 'primary' : 'inherit'}
                                    onClick={() => onSelect(index)}
                                >
                                    {vowel.symbol}
                                </Button>
                            )
                        })}
                    </Box>
                </>
            )}
        </Box>
    )
}
