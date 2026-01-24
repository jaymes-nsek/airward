import {Card,} from '@mui/material'
import './VowelDetailsCard.scss'
import type {VowelDetailsCardProps} from "../VowelDetails.types.ts";
import {VowelDetailsCardHeader} from "../vowel-details-header/VowelDetailsCardHeader.tsx";
import {VowelDetailsContent} from "../vowel-details-content/VowelDetailsContent.tsx";
import clsx from "clsx";
import {VowelActionControls} from "../vowel-action-controls/VowelActionControls.tsx";


export function VowelDetailsCard({vowelState, ...rest}: VowelDetailsCardProps) {
    return (
        <Card
            {...rest}
            className={clsx('vowel-details-card__wrapper', rest.className)}
            elevation={1}
        >
            <VowelDetailsCardHeader vowelState={vowelState}/>

            {/*disabled={!audioUrl}*/}

            <VowelActionControls vowelState={vowelState}/>
            {/*{error && <p role="alert">{error}</p>}*/}

            <VowelDetailsContent vowelState={vowelState}/>
        </Card>
    )
}