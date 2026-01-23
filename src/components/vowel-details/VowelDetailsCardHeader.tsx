import {Box, CardHeader, Skeleton, Typography} from "@mui/material";
import type {VowelDetails, VowelStateProps} from "./VowelDetails.types";
import {getVowelFromIndex} from "../../app/shared/utils/vowel-details.utils.ts";

export function VowelDetailsCardHeader({vowelState}: VowelStateProps) {
    const selectedVowel: VowelDetails | null = getVowelFromIndex(vowelState);

    return (
        <CardHeader
            className="vowel-details__header"
            title={
                <Box className="vowel-details__title">
                    {selectedVowel ? (
                        <Typography
                            className="vowel-details__symbol"
                            variant="h2"
                            sx={{color: 'primary.main'}}
                            aria-label={selectedVowel.name}
                        >
                            {selectedVowel.symbol} &mdash; {selectedVowel.name}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width={80}/>
                    )}
                </Box>
            }
            /*action={
                <IconButton className="vowel-details__favorite" color="primary" aria-label="Toggle vowel favourite state">
                    {details?.isFavorite ? <StarRounded/> : <StarBorderRounded/>}
                </IconButton>
            }*/
        />
    )
}
