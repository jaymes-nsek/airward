import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CardContent,
    Chip,
    Paper,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import type {VowelProps} from "../VowelDetails.types.ts";
import {useGetVowelAudio} from "../hooks/useGetVowelAudio.ts";
import {VowelActionControls} from "../vowel-action-controls/VowelActionControls.tsx";
import './VowelDetailsContent.scss';


/**
 * @param details The selected vowel
 */
export function VowelDetailsContent({details}: VowelProps) {
    const {audioUrl, error} = useGetVowelAudio(details?.id);

    if (error) {
        console.error('VowelDetailsCardContent ERR:', error);
    }

    return (
        <CardContent className="vowel-details-content">
            {/*disabled={!audioUrl}*/}
            <>
                <VowelActionControls audioUrl={audioUrl} details={details}/>
                {/*{error && <p role="alert">{error}</p>}*/}
            </>

            {/*<Divider className="vowel-details-content__divider"/>*/}

            <Accordion className="vowel-details-content__examples" elevation={0} disableGutters defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreRounded/>}>
                    <Typography variant="h3">Examples</Typography>
                </AccordionSummary>

                <AccordionDetails className="vowel-details-content__examples-body">
                    <Stack className="vowel-details-content__examples-list">
                        {details ? (
                            details.examples.map((example) => (
                                <Paper
                                    key={example.word}
                                    className="vowel-details-content__example"
                                    elevation={0}
                                    variant="outlined"
                                >
                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                        <Typography
                                            className="vowel-details-content__example-word"
                                            variant="h4"
                                            sx={{color: 'primary.main'}}
                                        >
                                            {example.word}
                                        </Typography>

                                        {/*<IconButton size="small" aria-label="open example">
                                            <ChevronRightRounded fontSize="small"/>
                                        </IconButton>*/}
                                    </Stack>

                                    <Stack
                                        className="vowel-details-content__example-chips"
                                        direction="row"
                                        flexWrap="wrap"
                                    >
                                        {example.pronunciations.map((pronunciation) => (
                                            <Chip
                                                className="vowel-details-content__example-chip"
                                                key={`${example.word}-${pronunciation.dialect}`}
                                                size="medium"
                                                variant="outlined"
                                                label={`${pronunciation.dialect}: ${pronunciation.ipa}`}
                                            />
                                        ))}
                                    </Stack>
                                </Paper>
                            ))
                        ) : (
                            <Stack className="vowel-details-content__examples-skeletons">
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