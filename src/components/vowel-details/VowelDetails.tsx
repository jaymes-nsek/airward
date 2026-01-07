import {
    ExpandMoreRounded,
    PlayArrowRounded,
    ReplayRounded,
    SlowMotionVideoRounded,
    StarBorderRounded,
    StarRounded
} from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    IconButton,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import type {VowelActionControlsProps, VowelProps} from "./VowelDetails.types";

function VowelActionControls({onPlay, onReplay, onSlow}: VowelActionControlsProps) {
    return (
        <Stack className="vowel-details-controls" direction="row" gap={2} flexWrap="wrap">
            <Button
                className="vowel-details-controls__button"
                size="small"
                variant="contained"
                startIcon={<PlayArrowRounded/>}
                onClick={onPlay}
            >
                Play
            </Button>

            <Button
                className="vowel-details-controls__button"
                size="small"
                variant="outlined"
                startIcon={<ReplayRounded/>}
                onClick={onReplay}
            >
                Replay
            </Button>

            <Button
                className="vowel-details-controls__button"
                size="small"
                variant="outlined"
                startIcon={<SlowMotionVideoRounded/>}
                onClick={onSlow}
            >
                Slow
            </Button>
        </Stack>
    )
}

export function VowelDetailsCardHeader({details}: VowelProps) {
    return (
        <CardHeader
            className="vowel-details__header"
            title={
                <Box className="vowel-details__title">
                    {details ? (
                        <Typography className="vowel-details__symbol" variant="h4" sx={{color: 'primary.main'}}>
                            {details.symbol}
                        </Typography>
                    ) : (
                        <Skeleton variant="text" width={80}/>
                    )}
                </Box>
            }
            action={
                <IconButton className="vowel-details__favorite" color="primary" aria-label="save vowel">
                    {details?.isFavorite ? <StarRounded/> : <StarBorderRounded/>}
                </IconButton>
            }
        />
    )
}

export function VowelDetailsCardContent({details}: VowelProps) {
    return (
        <CardContent className="vowel-details__content">
            <VowelActionControls/>

            <Divider className="vowel-details__divider"/>

            <Accordion className="vowel-details__examples" elevation={0} disableGutters defaultExpanded>
                <AccordionSummary
                    className="vowel-details__examples-summary"
                    expandIcon={<ExpandMoreRounded/>}
                >
                    <Typography variant="subtitle2">Examples</Typography>
                </AccordionSummary>

                <AccordionDetails className="vowel-details__examples-body">
                    <Stack spacing={1.5}>
                        {details ? (
                            details.examples.map((example) => (
                                <Box
                                    key={example.word}
                                    className="vowel-details__example"
                                    sx={{
                                        borderRadius: 2,
                                        border: '1px solid',
                                        borderColor: 'divider',
                                        px: 1.5,
                                        py: 1.25,
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography
                                            className="vowel-details__example-word"
                                            variant="subtitle2"
                                            sx={{color: 'primary.main'}}
                                        >
                                            {example.word}
                                        </Typography>

                                        {/*<IconButton size="small" aria-label="open example">
                                            <ChevronRightRounded fontSize="small"/>
                                        </IconButton>*/}
                                    </Stack>

                                    <Stack
                                        className="vowel-details__example-chips"
                                        direction="row"
                                        gap={1}
                                        flexWrap="wrap"
                                        mt={1}
                                    >
                                        {example.pronunciations.map((pronunciation) => (
                                            <Chip
                                                key={`${example.word}-${pronunciation.dialect}`}
                                                sx={{
                                                    padding: '4px 8px',
                                                }}
                                                size="medium"
                                                variant="outlined"
                                                label={`${pronunciation.dialect}: ${pronunciation.ipa}`}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            ))
                        ) : (
                            <Stack spacing={1}>
                                {[0, 1, 2].map((item) => (
                                    <Skeleton key={item} variant="rounded" height={64}/>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </CardContent>
    )
}