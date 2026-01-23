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
import type {
    PlaybackSettings,
    PlaybackSettingsPanelProps,
    VowelDetails,
    VowelStateProps
} from "../VowelDetails.types.ts";
import {type JSX, memo, type ReactNode, useEffect, useMemo, useState} from "react";
import SpeedRounded from "@mui/icons-material/SpeedRounded";
import SlowMotionVideoRounded from "@mui/icons-material/SlowMotionVideoRounded";
import './VowelActionControls.scss'
import {useVowelAudioPlayback} from "../hooks/useVowelAudioPlayback.ts";
import {WaveformScrubber} from "../../../app/shared/audio/components/waveform-scrubber/WaveformScrubber.tsx";
import {useGetVowelAudio} from "../hooks/useGetVowelAudio.ts";
import {getVowelFromIndex} from "../../../app/shared/utils/vowel-details.utils.ts";

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


function PlaybackSettingsPanel({
                                   settings,
                                   onSpeedChange,
                                   onRepeatChange
                               }: PlaybackSettingsPanelProps): JSX.Element {
    return (
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
                        value={settings.speed}
                        label="Speed"
                        inputProps={{'aria-label': 'Playback speed'}}
                        onChange={onSpeedChange}
                    >
                        {playbackSpeedOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                aria-label={`Speed: ${option.label}${settings.speed === option.value ? ', selected' : ''}`}
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
                        value={settings.repeatCount}
                        label="Repeat"
                        inputProps={{'aria-label': 'Repeat playback count'}}
                        onChange={onRepeatChange}
                    >
                        {repeatCountOptions.map((count) => (
                            <MenuItem
                                key={count}
                                value={count}
                                aria-label={`Repeat playback count: ${count}${settings.repeatCount === count ? ', selected' : ''}`}
                            >
                                <ListItemText primary={`${count}x`}/>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        </Paper>
    )
}

const PlaybackSettingsPanelMemo = memo(
    PlaybackSettingsPanel,
    (prev, next) =>
        prev.settings.speed === next.settings.speed &&
        prev.settings.repeatCount === next.settings.repeatCount
);


export function VowelActionControls({vowelState}: VowelStateProps) {
    const details: VowelDetails | null = getVowelFromIndex(vowelState);

    const [playbackSettings, setPlaybackSettings] = useState<PlaybackSettings>(() => getStoredPlaybackSettings());
    const {audioUrl, error} = useGetVowelAudio(details?.id);
    const {audioRef, onPlayHandler} = useVowelAudioPlayback(details, audioUrl, playbackSettings);
    const playbackDescriptionId = 'vowel-action-controls__playback-status';

    if (error) {
        console.error('VowelDetailsCardContent ERR:', error);
    }

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

            <WaveformScrubber
                audioRef={audioRef}
                audioUrl={audioUrl}
                disabled={!audioUrl}
            />

            <audio
                ref={audioRef}
                src={audioUrl ?? undefined}
                preload="metadata"
                aria-hidden="true"
            />

            <Button
                className="vowel-action-controls__playback-button"
                size="small"
                variant="contained"
                startIcon={<PlayArrowRounded/>}
                aria-describedby={playbackDescriptionId}
                onClick={onPlayHandler}
            >
                Play
            </Button>

            <PlaybackSettingsPanelMemo
                settings={playbackSettings}
                onSpeedChange={handleSpeedChange}
                onRepeatChange={handleRepeatChange}/>

            <Typography
                id={playbackDescriptionId}
                className="visually-hidden"
            >
                {playbackDescription}
            </Typography>
        </Stack>
    )
}