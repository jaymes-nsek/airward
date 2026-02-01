import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    Stack,
    Typography
} from "@mui/material";
import {type JSX, memo, type ReactNode, useEffect, useMemo} from "react";
import SpeedRounded from "@mui/icons-material/SpeedRounded";
import SlowMotionVideoRounded from "@mui/icons-material/SlowMotionVideoRounded";
import './VowelActionControls.scss'
import {WaveformScrubber} from "../../../audio/waveform-scrubber/WaveformScrubber.tsx";
import {playbackStorageKey, repeatCountOptions} from "./vowel-actions-controls.constants.ts";
import type {PlaybackSettings} from "../../models/playback.types.ts";
import type {PlaybackSettingsPanelProps, VowelPlaybackBaseProps} from "../../models/vowel-playback-props.types.ts";
import {useEvent} from "../../../../app/shared/hooks/useEvent.ts";


const playbackSpeedOptions: Array<{ value: PlaybackSettings['speed']; label: string; icon: ReactNode }> = [
    {value: 'normal', label: 'Normal', icon: <SpeedRounded fontSize="small"/>},
    {value: 'slow', label: 'Slow', icon: <SlowMotionVideoRounded fontSize="small"/>},
];

const playbackDescriptionId = 'vowel-action-controls__playback-status';
const TIMES = '\u00D7';

function PlaybackSettingsPanel({
                                   playbackSettings,
                                   onSpeedChange,
                                   onRepeatChange
                               }: PlaybackSettingsPanelProps): JSX.Element {
    const playbackDescription = useMemo(() => {
        const speedLabel = playbackSettings.speed === 'slow' ? 'Slow' : 'Normal';
        return `Playback settings: speed ${speedLabel}, repeat ${playbackSettings.repeatCount}x.`;
    }, [playbackSettings]);

    return (
        <Paper className="vowel-action-controls__playback-panel"
               variant="outlined"
        >
            <Typography className="vowel-action-controls__playback-title u-no-select" variant="h3">
                Playback settings
            </Typography>

            <Stack
                className="vowel-action-controls__playback-controls"
                aria-describedby={playbackDescriptionId}
            >
                <FormControl
                    variant="standard"
                    className="vowel-action-controls__playback-control"
                    size="small"
                >
                    <InputLabel id="vowel-details-playback-speed-label">Speed</InputLabel>

                    <Select
                        labelId="vowel-details-playback-speed-label"
                        value={playbackSettings.speed}
                        inputProps={{'aria-label': 'Playback speed'}}
                        onChange={onSpeedChange}
                    >
                        {playbackSpeedOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                            >
                                <ListItemText primary={option.label}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    className="vowel-action-controls__playback-control"
                    size="small"
                    variant="standard"
                >
                    <InputLabel id="vowel-details-playback-repeat-label">Repeat</InputLabel>

                    <Select
                        labelId="vowel-details-playback-repeat-label"
                        value={playbackSettings.repeatCount}
                        inputProps={{'aria-label': 'Repeat playback count'}}
                        onChange={onRepeatChange}
                    >
                        {repeatCountOptions.map((count) => (
                            <MenuItem
                                key={count}
                                value={count}
                            >
                                <ListItemText primary={`${count}${TIMES}`}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <Typography id={playbackDescriptionId} className="visually-hidden">
                {playbackDescription}
            </Typography>
        </Paper>
    )
}

const PlaybackSettingsPanelMemo = memo(
    PlaybackSettingsPanel,
    (prev, next) =>
        prev.playbackSettings.speed === next.playbackSettings.speed &&
        prev.playbackSettings.repeatCount === next.playbackSettings.repeatCount
);


export type PlayButtonProps = {
    onPlayHandler: () => void;
    // disabled: boolean;
};

export const PlayButtonMemo = memo(function PlayButton({
                                                           onPlayHandler,
                                                       }: PlayButtonProps) {
        return (
            <Button
                className="vowel-action-controls__playback-button"
                size="small"
                variant="contained"
                startIcon={<PlayArrowRounded/>}
                aria-label="Play vowel audio"
                onClick={onPlayHandler}
                // disabled={disabled}
            >
                Play
            </Button>
        );
    },
    () => true // prev, next
);


export const VowelActionControlsMemo = memo(function VowelActionControls({
                                                                             playbackSettings,
                                                                             audioUrl,
                                                                             audioRef,
                                                                             onPlayHandler,
                                                                             onSpeedChange,
                                                                             onRepeatChange
                                                                         }: VowelPlaybackBaseProps) {
        const disablePlay = !audioUrl;
        console.log('audioUrl', audioUrl);

        useEffect(() => {
            if (typeof window === 'undefined') {
                return;
            }

            window.localStorage.setItem(playbackStorageKey, JSON.stringify(playbackSettings));
        }, [playbackSettings]);

        // Use memo to pass a stable onPlay ref to PlayButtonMemo whilst pointing each new onPlayHandler to it;
        // This prevents PlayBtn from rapid unmount/mount, which looks janky
        const stableOnPlay = useEvent(onPlayHandler);

        return (
            <Box className="vowel-action-controls" aria-busy={disablePlay}>
                <Stack
                    className="vowel-action-controls__stack"
                    sx={{
                        visibility: disablePlay ? 'hidden' : 'visible',
                        pointerEvents: disablePlay ? 'none' : 'auto',
                    }}
                >
                    <WaveformScrubber
                        audioRef={audioRef}
                        audioUrl={audioUrl}
                        disabled={disablePlay}
                        showTime
                    />

                    <audio
                        ref={audioRef}
                        src={audioUrl ?? undefined}
                        preload="metadata"
                        aria-hidden="true"
                    />

                    {
                        <PlayButtonMemo
                            onPlayHandler={stableOnPlay}
                            // disabled={disablePlay}
                        />
                    }

                    <PlaybackSettingsPanelMemo
                        playbackSettings={playbackSettings}
                        onSpeedChange={onSpeedChange}
                        onRepeatChange={onRepeatChange}
                    />
                </Stack>

                {disablePlay && (
                    <Skeleton
                        className="vowel-action-controls__skeleton"
                        variant="rectangular"
                    />
                )}
            </Box>
        );

    }
)