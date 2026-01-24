import {Card, type CardProps,} from '@mui/material'
import './VowelDetailsCard.scss'

import {VowelDetailsCardHeader} from "../vowel-details-header/VowelDetailsCardHeader.tsx";
import {VowelDetailsContent} from "../vowel-details-content/VowelDetailsContent.tsx";
import clsx from "clsx";
import {VowelActionControlsMemo} from "../vowel-action-controls/VowelActionControls.tsx";
import type {VowelPlaybackProps} from "../../models/vowel-playback-props.types.ts";

type VowelDetailsCardProps = VowelPlaybackProps & CardProps;

export function VowelDetailsCard({
                                     selectedVowel,
                                     playbackSettings,
                                     audioUrl,
                                     audioRef,
                                     onPlayHandler,
                                     onSpeedChange,
                                     onRepeatChange,
                                     ...rest
                                 }: VowelDetailsCardProps) {
    return (
        <Card
            {...rest}
            className={clsx('vowel-details-card__wrapper', rest.className)}
            elevation={1}
        >
            <VowelDetailsCardHeader selectedVowel={selectedVowel}/>

            <VowelActionControlsMemo
                playbackSettings={playbackSettings}
                audioUrl={audioUrl}
                audioRef={audioRef}
                onPlayHandler={onPlayHandler}
                onSpeedChange={onSpeedChange}
                onRepeatChange={onRepeatChange}
            />
            {/*{error && <p role="alert">{error}</p>}*/}

            <VowelDetailsContent selectedVowel={selectedVowel}/>
        </Card>
    )
}