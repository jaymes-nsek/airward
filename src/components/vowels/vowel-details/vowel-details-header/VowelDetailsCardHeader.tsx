import "./VowelDetailsCardHeader.scss"
import {Box, CardHeader, Skeleton, Typography} from "@mui/material";
import type {VowelBaseProps} from "../../models/vowel-playback-props.types.ts";


export function VowelDetailsCardHeader({selectedVowel}: VowelBaseProps) {
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
