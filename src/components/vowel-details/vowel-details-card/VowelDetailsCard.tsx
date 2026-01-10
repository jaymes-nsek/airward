import {Box, type BoxProps, Card,} from '@mui/material'
import './VowelDetailsCard.scss'
import type {VowelDetails} from "../VowelDetails.types.ts";
import {VowelDetailsCardContent, VowelDetailsCardHeader} from "../VowelDetails.tsx";

export type VowelDetailsCardProps = BoxProps & {
    vowel: VowelDetails | null
}

export function VowelDetailsCard({vowel, ...rest}: VowelDetailsCardProps) {
    return (
        <Box
            className="vowel-details"
            {...rest}
        >
            <Card
                className="vowel-details__card"
                elevation={1}
            >
                <VowelDetailsCardHeader details={vowel}/>

                <VowelDetailsCardContent details={vowel}/>
            </Card>
        </Box>
    )
}