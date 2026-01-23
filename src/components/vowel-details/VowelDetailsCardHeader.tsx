import {Box, CardHeader, Skeleton, Typography} from "@mui/material";
import type {VowelProps} from "./VowelDetails.types";

export function VowelDetailsCardHeader({details}: VowelProps) {
    return (
        <CardHeader
            className="vowel-details__header"
            title={
                <Box className="vowel-details__title">
                    {details ? (
                        <Typography
                            className="vowel-details__symbol"
                            variant="h2"
                            sx={{color: 'primary.main'}}
                            aria-label={details.name}
                        >
                            {details.symbol} &mdash; {details.name}
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
