import "./VowelDetailsCardHeader.scss"
import {Box, CardHeader, Skeleton, Typography} from "@mui/material";
import type {VowelDetails, VowelStateProps} from "../VowelDetails.types.ts";
import {getVowelFromIndex} from "../../../app/shared/utils/vowel-details.utils.ts";


export function VowelDetailsCardHeader({vowelState}: VowelStateProps) {
    const selectedVowel: VowelDetails | null = getVowelFromIndex(vowelState);

    return (
        <CardHeader
            className="vowel-details-header"
            title={
                <Box>
                    {selectedVowel ? (
                        <Typography
                            className="vowel-details-header__title"
                            variant="h2"
                            sx={{
                                color: 'primary.main'
                            }}
                            aria-label={selectedVowel.name}
                        >
                            {selectedVowel.symbol} &mdash; {selectedVowel.name}
                        </Typography>
                    ) : (
                        <Skeleton
                            className="vowel-details-header__skeleton"
                            variant="text"
                            sx={{
                                color: 'primary.main',
                            }}
                        />
                    )}
                </Box>
            }
            /*action={
                <IconButton className="vowel-details-header__favorite" color="primary" aria-label="Toggle vowel favourite state">
                    {details?.isFavorite ? <StarRounded/> : <StarBorderRounded/>}
                </IconButton>
            }*/
        />
    )
}
