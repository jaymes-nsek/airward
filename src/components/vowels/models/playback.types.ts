export type PlaybackSpeed = 'normal' | 'slow'

export type RepeatCount = 1 | 2 | 3 | 4 | 5

export interface PlaybackSettings {
    speed: PlaybackSpeed
    repeatCount: RepeatCount
}
