import type { NavItem } from './types'
import {
    HeadphonesRounded,
    InsightsRounded,
    MenuBookRounded,
    MicRounded,
} from '@mui/icons-material'

export const navItems: NavItem[] = [
    { key: 'library', label: 'Library', icon: <MenuBookRounded /> },
    { key: 'listen', label: 'Listen', icon: <HeadphonesRounded /> },
    { key: 'speak', label: 'Speak', icon: <MicRounded /> },
    { key: 'stats', label: 'Stats', icon: <InsightsRounded /> },
]
