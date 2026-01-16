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

export const navItems: NavItem[] = [
    {key: 'library', label: 'Library', icon: <MenuBookRounded/>, to: '/library'},
    {key: 'listen', label: 'Listen', icon: <HeadphonesRounded/>, to: '/listen'},
    {key: 'speak', label: 'Speak', icon: <MicRounded/>, to: '/speak'},
    {key: 'stats', label: 'Stats', icon: <InsightsRounded/>, to: '/stats'},
]