import type {PlaybackSettings} from "../../models/playback.types.ts";

export const playbackStorageKey = 'airward.playbackSettings';
export const repeatCountOptions: PlaybackSettings['repeatCount'][] = [1, 2, 3, 4, 5];