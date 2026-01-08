import {Box, Button, CircularProgress, Typography} from '@mui/material'
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded'
import type {VowelDetails} from '../vowel-details/VowelDetails.types.ts'
import './VowelLibrary.scss'

type VowelLibraryListProps = {
    vowels: VowelDetails[]
    selectedIndex: number
    isLoading: boolean
    onSelect: (index: number) => void
    onPrev: () => void
    onNext: () => void
}

export function VowelLibraryList({
                                     vowels,
                                     selectedIndex,
                                     isLoading,
                                     onSelect,
                                     onPrev,
                                     onNext,
                                 }: VowelLibraryListProps) {
    return (
        <Box className="vowel-library">
            {isLoading ? (
                <Box className="vowel-library__loading">
                    <CircularProgress size={28} />
                    <Typography variant="body2">Loading vowels...</Typography>
                </Box>
            ) : (
                <>
                    <Box className="vowel-library__grid vowel-library__grid--tablet">
                        {vowels.map((vowel, index) => (
                            <Button
                                key={`${vowel.symbol}-${vowel.keyword}`}
                                className={
                                    index === selectedIndex
                                        ? 'vowel-library__item vowel-library__item--active'
                                        : 'vowel-library__item'
                                }
                                variant={index === selectedIndex ? 'contained' : 'outlined'}
                                color={index === selectedIndex ? 'primary' : 'inherit'}
                                onClick={() => onSelect(index)}
                            >
                                {vowel.symbol}
                            </Button>
                        ))}
                    </Box>
                    <Box className="vowel-library__grid vowel-library__grid--desktop">
                        {vowels.map((vowel, index) => (
                            <Button
                                key={`${vowel.symbol}-${vowel.keyword}`}
                                className={
                                    index === selectedIndex
                                        ? 'vowel-library__item vowel-library__item--active'
                                        : 'vowel-library__item'
                                }
                                variant={index === selectedIndex ? 'contained' : 'outlined'}
                                color={index === selectedIndex ? 'primary' : 'inherit'}
                                onClick={() => onSelect(index)}
                            >
                                {vowel.symbol}
                            </Button>
                        ))}
                    </Box>
                    <Box className="vowel-library__controls">
                        <Button
                            className="vowel-library__control"
                            variant="outlined"
                            startIcon={<ArrowBackIosNewRounded />}
                            onClick={onPrev}
                            disabled={!vowels.length}
                        >
                            Prev
                        </Button>
                        <Button
                            className="vowel-library__control"
                            variant="outlined"
                            endIcon={<ArrowForwardIosRounded />}
                            onClick={onNext}
                            disabled={!vowels.length}
                        >
                            Next
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    )
}
