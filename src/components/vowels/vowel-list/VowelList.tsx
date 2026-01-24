import {Box, type BoxProps, Button, CircularProgress, Typography} from '@mui/material'
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded'
import './VowelList.scss'
import {useListboxNavigation} from "../../../app/shared/a11y/useListboxNavigation.ts";
import {getVowelOptionId} from "../../../app/shared/a11y/listboxIds.ts";
import clsx from "clsx";
import {type JSX} from "react";
import type {
    VowelControlsProps,
    VowelListProps,
    VowelListItemProps
} from "../models/vowel-playback-props.types.ts";

type VowelSmallWidthControlsProps = BoxProps & VowelControlsProps;

/**
 * Intended for use for small device width
 */
export function VowelSmallWidthControls({
                                            vowels,
                                            onPrev,
                                            onNext,
                                            ...rest
                                        }: VowelSmallWidthControlsProps) {
    return (
        <Box className="vowel-list__controls" {...rest}>
            <Button
                className="vowel-list__control"
                variant="outlined"
                startIcon={<ArrowBackIosNewRounded/>}
                onClick={onPrev}
                disabled={!vowels.length}
            >
                Prev
            </Button>
            <Button
                className="vowel-list__control"
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

function VowelListItem({
                           vowel,
                           index,
                           isSelected,
                           isActive,
                           onSelect,
                           onPlayHandler
                       }: VowelListItemProps): JSX.Element {
    const handleClick = () => {
        onSelect(index);
        onPlayHandler(); // pointer activation: select + play
    };

    return (
        <Button
            id={getVowelOptionId(vowel.id)}
            role="option"
            aria-selected={isSelected}
            aria-label={vowel.name}
            tabIndex={-1} // critical: only the listbox is tabbable
            className={clsx(
                'vowel-list__item',
                isActive && 'vowel-list__item--active',
            )}
            variant={isActive ? 'contained' : 'outlined'}
            color={isActive ? 'primary' : 'inherit'}
            onClick={handleClick}
        >
            {vowel.symbol}
        </Button>
    )
}

VowelListItem.displayName = 'VowelListItem -- displayName test'

/**
 * Intended for use for medium+ device width (note, this includes table in landscape orientation)
 */
export function VowelList({
                              vowels,
                              selectedIndex,
                              isLoading,
                              onSelect,
                              onPlayHandler,
                              ...rest
                          }: VowelListProps) {
    const count = vowels.length

    const {safeSelectedIndex, onKeyDown} = useListboxNavigation({
        count,
        selectedIndex,
        onSelect,
        wrap: true,
        confirmOnSpaceEnter: false, // handle Enter/Space explicitly here
    })

    const activeDescendant =
        safeSelectedIndex >= 0 ? getVowelOptionId(vowels[safeSelectedIndex].id) : undefined

    const keyDownHandler: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        // Let the navigation hook handle arrows/home/end etc.
        onKeyDown(e as never);

        if (count === 0) {
            return;
        }

        // Only play/confirm on explicit activation keys.
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();

            // Commit selection to the currently active descendant.
            if (safeSelectedIndex >= 0) {
                onSelect(safeSelectedIndex);
            }

            // Then play (single explicit intent).
            if (onPlayHandler) {
                onPlayHandler();
            }
        }
    };

    return (
        <Box className="vowel-list"
             role="listbox"
             tabIndex={0}
             aria-label="Vowel library"
             aria-activedescendant={activeDescendant}
             aria-busy={isLoading || undefined}
             onKeyDown={keyDownHandler}
             {...rest}
        >
            {isLoading ? (
                <Box className="vowel-list__loading">
                    <CircularProgress size={28}/>
                    <Typography variant="body2">Loading vowels...</Typography>
                </Box>
            ) : (
                <>
                    <Box className="vowel-list__grid">
                        {vowels.map((vowel, index) => (
                            <VowelListItem
                                key={vowel.id}
                                vowel={vowel}
                                index={index}
                                isSelected={index === selectedIndex} // aria-selected tracks committed selection
                                isActive={index === safeSelectedIndex} // isActive tracks roving highlight
                                onSelect={onSelect}
                                onPlayHandler={onPlayHandler}
                            />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    )
}
