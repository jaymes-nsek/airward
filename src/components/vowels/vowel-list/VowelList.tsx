import {Box, type BoxProps, Button, ListItem, ListItemButton, Skeleton} from '@mui/material'
import ArrowBackIosNewRounded from '@mui/icons-material/ArrowBackIosNewRounded'
import ArrowForwardIosRounded from '@mui/icons-material/ArrowForwardIosRounded'
import './VowelList.scss'
import {useListboxNavigation} from "../../../app/shared/a11y/useListboxNavigation.ts";
import {getVowelOptionId} from "../../../app/shared/a11y/listboxIds.ts";
import clsx from "clsx";
import {type JSX, type KeyboardEventHandler} from "react";
import type {
    VowelControlsProps,
    VowelListItemLoadingProps,
    VowelListItemProps,
    VowelListProps
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

function VowelListItem(props: VowelListItemProps | VowelListItemLoadingProps): JSX.Element {
    return (
        <ListItem
            component="li"
            role="none"
            className="vowel-list__item"
            disablePadding
        >
            {props.variant === 'loading' ? (
                <Skeleton
                    className="vowel-list__loading"
                    variant="rectangular"
                    role="presentation"
                    aria-hidden={true}
                />
            ) : (
                <ListItemButton
                    id={getVowelOptionId(props.vowel.id)}
                    role="option"
                    aria-selected={props.isSelected}
                    aria-label={props.vowel.name}
                    tabIndex={-1}
                    className={clsx(
                        'vowel-list__item-button',
                        props.isActive && 'vowel-list__item-button--active',
                    )}
                    selected={props.isSelected} // aria-selected tracks committed selection
                    onClick={() => {
                        props.onSelect(props.index);
                        props.onPlayHandler(); // pointer activation: select + play
                    }}
                >
                    {props.vowel.symbol}
                </ListItemButton>
            )}
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
    const view = {
        isLoading: loadState.status === 'loading',
        isError: loadState.status === 'error',
        // errorMessage: loadState.status === 'error' ? loadState.errorMessage : undefined,
    };

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

        if (view.isLoading || view.isError || count === 0) {
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

    const ITEM_COUNT_LOADING = 20;
    const itemCount = view.isLoading ? ITEM_COUNT_LOADING : vowels.length;

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
                aria-busy={view.isLoading || undefined}
                aria-disabled={(view.isLoading || view.isError) || undefined}
                className={clsx('vowel-list', rest.className)}
                sx={{
                    ...(rest.sx as object),
                    pointerEvents: (view.isLoading || view.isError) ? 'none' : 'auto',
                }}
            >
                {Array.from({length: itemCount}).map((_, index) => {
                    if (view.isLoading) {
                        return (
                            <VowelListItem
                                key={`vowel-loading-${index}`}
                                variant="loading"
                                index={index}
                            />
                        )
                    }

                    const vowel = vowels[index];

                    return (
                        <VowelListItem
                            key={vowel.id}
                            variant="loaded"
                            vowel={vowel}
                            index={index}
                            isSelected={index === selectedIndex}
                            isActive={index === safeSelectedIndex}
                            onSelect={onSelect}
                            onPlayHandler={onPlayHandler}
                        />
                    );
                })}
            </Box>
        </>
    );
}
