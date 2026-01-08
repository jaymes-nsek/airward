import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import HeadphonesRounded from '@mui/icons-material/HeadphonesRounded'
import MicRounded from '@mui/icons-material/MicRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import {type ReactElement} from 'react'
import {Box, useMediaQuery,} from '@mui/material'
import './App.scss'
import {ResponsiveNavigation} from "./app/navigation/ResponsiveNavigation/ResponsiveNavigation.tsx";
import {theme} from "./theme";
import { Outlet } from "react-router-dom"


type NavKey = 'library' | 'listen' | 'speak' | 'stats'

export type NavItem = {
    key: NavKey;
    label: string;
    icon: ReactElement;
    to: string;
};

const navItems: NavItem[]  = [
    {key: 'library', label: 'Library', icon: <MenuBookRounded/>, to: '/library'},
    {key: 'listen', label: 'Listen', icon: <HeadphonesRounded/>, to: '/listen' },
    {key: 'speak', label: 'Speak', icon: <MicRounded/>, to: '/speak'},
    {key: 'stats', label: 'Stats', icon: <InsightsRounded/>, to: '/stats'},
]


function App() {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <ResponsiveNavigation isDesktop={isDesktop} items={navItems}>
            <Box className={isDesktop ? 'shell shell--desktop' : 'shell'}>
                <Outlet />
            </Box>
        </ResponsiveNavigation>
    )
}

export default App
