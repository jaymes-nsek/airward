import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import HeadphonesRounded from '@mui/icons-material/HeadphonesRounded'
import MicRounded from '@mui/icons-material/MicRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import {type ReactElement, useState} from 'react'
import {Box, useMediaQuery,} from '@mui/material'
import './App.css'
import {ResponsiveNavigation} from "./app/navigation/ResponsiveNavigation/ResponsiveNavigation.tsx";
import {VowelDetailsCard} from "./components/vowel-details/vowel-details-card/VowelDetailsCard.tsx";
import {theme} from "./theme";

type NavKey = 'library' | 'listen' | 'speak' | 'stats'

const navItems: Array<{ key: NavKey; label: string; icon: ReactElement }> = [
    {key: 'library', label: 'Library', icon: <MenuBookRounded/>},
    {key: 'listen', label: 'Listen', icon: <HeadphonesRounded/>},
    {key: 'speak', label: 'Speak', icon: <MicRounded/>},
    {key: 'stats', label: 'Stats', icon: <InsightsRounded/>},
]


function App() {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const [active, setActive] = useState<NavKey>('library')

    return (
        <ResponsiveNavigation isDesktop={isDesktop} items={navItems} value={active} onChange={setActive}>
            <Box className={isDesktop ? 'shell shell--desktop' : 'shell'}>
                <VowelDetailsCard/>
            </Box>
        </ResponsiveNavigation>
    )
}

export default App
