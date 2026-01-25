import HeadphonesRounded from '@mui/icons-material/HeadphonesRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import MicRounded from '@mui/icons-material/MicRounded'
import type {ReactNode} from "react";

export type NavKey = 'library' | 'listen' | 'speak' | 'stats'

export type NavItem = {
    key: NavKey
    label: string
    icon?: ReactNode
    to: string
}

export const PAGES_NAV_ROUTES = {
    LIBRARY: '/library',
    LISTEN: '/listen',
    SPEAK: '/speak',
    STATS: '/stats',
}

export const navItems: NavItem[] = [
    {key: 'library', label: 'Library', icon: <MenuBookRounded/>, to: PAGES_NAV_ROUTES.LIBRARY},
    {key: 'listen', label: 'Listen', icon: <HeadphonesRounded/>, to: PAGES_NAV_ROUTES.LISTEN},
    {key: 'speak', label: 'Speak', icon: <MicRounded/>, to: PAGES_NAV_ROUTES.SPEAK},
    {key: 'stats', label: 'Stats', icon: <InsightsRounded/>, to: PAGES_NAV_ROUTES.STATS},
]