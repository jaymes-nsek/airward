import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import {
    Button,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Paper,
    Select,
    type SelectChangeEvent,
    Stack,
    Typography
} from "@mui/material";
import type {PlaybackSettings, VowelActionControlsProps} from "../VowelDetails.types.ts";
import {type ReactNode, useEffect, useMemo, useState} from "react";
import {SpeedRounded} from "@mui/icons-material";
import SlowMotionVideoRounded from "@mui/icons-material/SlowMotionVideoRounded";
import './VowelActionControls.scss'

const defaultPlaybackSettings: PlaybackSettings = {
    speed: 'normal',
    repeatCount: 1,
};

const playbackSpeedOptions: Array<{ value: PlaybackSettings['speed']; label: string; icon: ReactNode }> = [
    {value: 'normal', label: 'Normal', icon: <SpeedRounded fontSize="small"/>},
    {value: 'slow', label: 'Slow', icon: <SlowMotionVideoRounded fontSize="small"/>},
];

const playbackStorageKey = 'airward.playbackSettings';

const repeatCountOptions: PlaybackSettings['repeatCount'][] = [1, 2, 3, 4, 5];

function getStoredPlaybackSettings(): PlaybackSettings {
    if (typeof window === 'undefined') {
        return defaultPlaybackSettings;
    }

    const stored = window.localStorage.getItem(playbackStorageKey);

    if (!stored) {
        return defaultPlaybackSettings;
    }

    try {
        const parsed = JSON.parse(stored) as Partial<PlaybackSettings>;
        const speed = parsed.speed === 'slow' ? 'slow' : 'normal';
        const repeatCount = repeatCountOptions.includes(parsed.repeatCount as PlaybackSettings['repeatCount'])
            ? (parsed.repeatCount as PlaybackSettings['repeatCount'])
            : 1;

        return {speed, repeatCount};
    } catch (error) {
        console.warn('Unable to parse playback settings from storage.', error);
        return defaultPlaybackSettings;
    }
}


export function VowelActionControls({onPlay}: VowelActionControlsProps) {
    const [playbackSettings, setPlaybackSettings] = useState<PlaybackSettings>(() => getStoredPlaybackSettings());
    const playbackDescriptionId = 'vowel-action-controls__playback-status';

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem(playbackStorageKey, JSON.stringify(playbackSettings));
    }, [playbackSettings]);

    const playbackDescription = useMemo(() => {
        const speedLabel = playbackSettings.speed === 'slow' ? 'Slow' : 'Normal';
        return `Playback settings: speed ${speedLabel}, repeat ${playbackSettings.repeatCount}x.`;
    }, [playbackSettings]);

    const handleSpeedChange = (event: SelectChangeEvent<PlaybackSettings['speed']>) => {
        setPlaybackSettings((prev) => ({
            ...prev,
            speed: event.target.value as PlaybackSettings['speed'],
        }));
    };

    const handleRepeatChange = (event: SelectChangeEvent<PlaybackSettings['repeatCount']>) => {
        const nextValue = Number(event.target.value) as PlaybackSettings['repeatCount'];
        setPlaybackSettings((prev) => ({
            ...prev,
            repeatCount: nextValue,
        }));
    };
    
    return (
        <Stack className="vowel-action-controls">
            <h3 className="visually-hidden">Vowel Details Audio Controls</h3>

            <Button
                className="vowel-action-controls__playback-button"
                size="small"
                variant="contained"
                startIcon={<PlayArrowRounded/>}
                aria-describedby={playbackDescriptionId}
                onClick={onPlay}
            >
                Play
            </Button>

            <Paper className="vowel-action-controls__playback-panel" variant="outlined">
                <Typography className="vowel-action-controls__playback-title" variant="h3">
                    Playback settings
                </Typography>

                <Stack className="vowel-action-controls__playback-controls">
                    <FormControl
                        variant="standard"
                        className="vowel-action-controls__playback-control"
                        size="small"
                    >
                        <InputLabel id="vowel-details-playback-speed-label">Speed</InputLabel>

                        <Select
                            labelId="vowel-details-playback-speed-label"
                            value={playbackSettings.speed}
                            label="Speed"
                            inputProps={{'aria-label': 'Playback speed'}}
                            onChange={handleSpeedChange}
                        >
                            {playbackSpeedOptions.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    aria-label={`Speed: ${option.label}${playbackSettings.speed === option.value ? ', selected' : ''}`}
                                >
                                    {/*<ListItemIcon>{option.icon}</ListItemIcon>*/}
                                    <ListItemText primary={option.label}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className="vowel-action-controls__playback-control" size="small" variant="standard">
                        <InputLabel id="vowel-details-playback-repeat-label">Repeat</InputLabel>

                        <Select
                            labelId="vowel-details-playback-repeat-label"
                            value={playbackSettings.repeatCount}
                            label="Repeat"
                            inputProps={{'aria-label': 'Repeat playback count'}}
                            onChange={handleRepeatChange}
                        >
                            {repeatCountOptions.map((count) => (
                                <MenuItem
                                    key={count}
                                    value={count}
                                    aria-label={`Repeat playback count: ${count}${playbackSettings.repeatCount === count ? ', selected' : ''}`}
                                >
                                    {/*<ListItemIcon>
                                        <ReplayRounded fontSize="small"/>
                                    </ListItemIcon>*/}
                                    <ListItemText primary={`${count}x`}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </Paper>

            <Typography
                id={playbackDescriptionId}
                className="visually-hidden"
            >
                {playbackDescription}
            </Typography>
        </Stack>
    )
}