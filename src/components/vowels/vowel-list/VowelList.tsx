import {Box, type BoxProps, Button, ListItem, ListItemButton, Skeleton} from '@mui/material'
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded'
import './VowelList.scss'
import {useListboxNavigation} from "../../../app/shared/a11y/useListboxNavigation.ts";
import {getVowelOptionId} from "../../../app/shared/a11y/listboxIds.ts";
import clsx from "clsx";
import {type JSX, type KeyboardEventHandler} from "react";
import type {VowelControlsProps, VowelListItemProps, VowelListProps} from "../models/vowel-playback-props.types.ts";

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
        <ListItem
            component="li"
            role="none"
            className="vowel-list__item"
            disablePadding
            key={vowel.id}
        >
            <ListItemButton
                id={getVowelOptionId(vowel.id)}
                role="option"
                aria-selected={isSelected}
                aria-label={vowel.name}
                tabIndex={-1} // only the listbox itself is tabbable
                className={clsx(
                    'vowel-list__item-button',
                    isActive && 'vowel-list__item-button--active',
                )}
                selected={isSelected}
                onClick={handleClick}
            >
                {vowel.symbol}
            </ListItemButton>
        </ListItem>
    )
}

VowelListItem.displayName = 'VowelListItem'

/**
 * Intended for use for medium+ device width (note, this includes table in landscape orientation)
 */
export function VowelList({
                              loadState,
                              vowels,
                              selectedIndex,
                              onSelect,
                              onPlayHandler,
                              ...rest
                          }: VowelListProps) {
    const isLoading = loadState.status === 'loading';
    const isError = loadState.status === 'error';

    const count = vowels.length;

    const {safeSelectedIndex, onKeyDown} = useListboxNavigation({
        count,
        selectedIndex,
        onSelect,
        wrap: true,
        confirmOnSpaceEnter: false, // handle Enter/Space explicitly here
    });

    const activeDescendant =
        safeSelectedIndex >= 0 ? getVowelOptionId(vowels[safeSelectedIndex].id) : undefined;

    const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
        // Let the navigation hook handle arrows/home/end etc.
        onKeyDown(e as never);

        if (isLoading || isError || count === 0) {
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
        <>
            {/*className="vowel-list"*/}
            <Box
                component="ul"
                role="listbox"
                tabIndex={0}
                aria-label="Vowel library"
                aria-activedescendant={activeDescendant}
                onKeyDown={keyDownHandler}
                {...rest}
                aria-busy={isLoading || undefined}
                aria-disabled={(isLoading || isError) || undefined}
                className={clsx('vowel-list', rest.className)}
                sx={{
                    ...(rest.sx as object),
                    pointerEvents: (isLoading || isError) ? 'none' : 'auto',
                }}
            >
                {isLoading ? (
                    Array.from({length: 20}).map((_, i) => (
                        <ListItem
                            key={`vowel-skeleton-${i}`}
                            component="li"
                            role="none"
                            className="vowel-list__item"
                            disablePadding
                        >
                            {/* role="presentation" so SRs don’t treat this like a meaningful control */}
                            <Skeleton
                                className="vowel-list__loading"
                                variant="rectangular"
                                role="presentation"
                            />
                        </ListItem>
                    ))
                ) : (
                    vowels.map((vowel, index) => (
                        <VowelListItem
                            key={vowel.id}
                            vowel={vowel}
                            index={index}
                            isSelected={index === selectedIndex} // aria-selected tracks committed selection
                            isActive={index === safeSelectedIndex} // isActive tracks roving highlight
                            onSelect={onSelect}
                            onPlayHandler={onPlayHandler}
                        />
                    ))
                )}
            </Box>
        </>
    );
}
