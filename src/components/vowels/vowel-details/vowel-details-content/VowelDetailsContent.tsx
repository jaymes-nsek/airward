import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    CardContent,
    Chip,
    Divider,
    Paper,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import './VowelDetailsContent.scss';
import type {VowelBaseProps} from "../../models/vowel-playback-props.types.ts";


/**
 * @param details The selected vowel
 */
export function VowelDetailsContent({selectedVowel}: VowelBaseProps) {
    return (
        <CardContent className="vowel-details-content">
            <Divider className="vowel-details-content__divider"/>

            <Accordion
                className="vowel-details-content__examples"
                elevation={0} disableGutters defaultExpanded
            >
                <AccordionSummary expandIcon={<ExpandMoreRounded/>}>
                    <Typography variant="h3">Examples</Typography>
                </AccordionSummary>

                <AccordionDetails className="vowel-details-content__examples-body">
                    {selectedVowel ?
                        <Box
                            component="ul"
                            className="vowel-details-content__examples-list"
                            sx={{listStyle: 'none', p: 0, m: 0}}
                        >
                            {selectedVowel.examples.map((example) => (
                                <Paper
                                    key={example.word}
                                    component="li"
                                    className="vowel-details-content__example"
                                    elevation={0}
                                    variant="outlined"
                                >
                                    <Typography
                                        component="span"
                                        className="vowel-details-content__example-word"
                                        variant="body1"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 600,
                                        }}
                                    >
                                        {example.word}
                                    </Typography>

                                    <Stack
                                        className="vowel-details-content__example-chips"
                                        direction="row"
                                        flexWrap="wrap"
                                    >
                                        {example.pronunciations.map((pronunciation) => (
                                            <Chip
                                                key={`${example.word}-${pronunciation.dialect}`}
                                                className="vowel-details-content__example-chip"
                                                size="medium"
                                                variant="outlined"
                                                label={`${pronunciation.dialect}: ${pronunciation.ipa}`}
                                            />
                                        ))}
                                    </Stack>
                                </Paper>
                            ))}
                        </Box>
                        :
                        <Stack className="vowel-details-content__examples-skeletons">
                            {[0, 1, 2].map((item) => (
                                <Skeleton key={item} variant="rounded" height={64}/>
                            ))}
                        </Stack>
                    }
                </AccordionDetails>
            </Accordion>
        </CardContent>
    )
}