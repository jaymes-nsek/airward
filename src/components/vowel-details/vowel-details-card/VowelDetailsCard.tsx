import {useEffect, useState} from 'react'
import {Box, Card,} from '@mui/material'
import {vowelDetailsService} from '../../../services/VowelDetailsService.ts'
import './VowelDetailsCard.scss'
import type {VowelDetails} from "../VowelDetails.types.ts";
import {VowelDetailsCardContent, VowelDetailsCardHeader} from "../VowelDetails.tsx";


export function VowelDetailsCard() {
    const [details, setDetails] = useState<VowelDetails | null>(null)

    useEffect(() => {
        const subscription = vowelDetailsService.getVowelDetails().subscribe((response) => {
            setDetails(response)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <Box className="vowel-details">
            <Card
                className="vowel-details__card"
                elevation={1}
            >
                <VowelDetailsCardHeader details={details}/>

                <VowelDetailsCardContent details={details}/>
            </Card>
        </Box>
    )
}
