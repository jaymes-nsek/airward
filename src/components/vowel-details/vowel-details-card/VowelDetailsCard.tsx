import {Card, type CardProps,} from '@mui/material'
import './VowelDetailsCard.scss'
import type {VowelDetails} from "../VowelDetails.types.ts";
import {VowelDetailsCardHeader} from "../VowelDetailsCardHeader.tsx";
import {VowelDetailsContent} from "../vowel-details-content/VowelDetailsContent.tsx";
import clsx from "clsx";


export type VowelDetailsCardProps = CardProps & {
    vowel: VowelDetails | null
}

export function VowelDetailsCard({vowel, ...rest}: VowelDetailsCardProps) {
    return (
            <Card
                {...rest}
                className={clsx('vowel-details-card__wrapper', rest.className)}
                elevation={1}
            >
                <VowelDetailsCardHeader details={vowel}/>

                <VowelDetailsContent details={vowel}/>
            </Card>
    )
}