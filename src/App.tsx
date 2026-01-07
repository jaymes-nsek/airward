import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import HeadphonesRounded from '@mui/icons-material/HeadphonesRounded'
import MicRounded from '@mui/icons-material/MicRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import {type ReactElement, useState} from 'react'
import {Box, ThemeProvider, useMediaQuery,} from '@mui/material'
import {theme} from './theme';
import './App.css'
import {ResponsiveNavigation} from "./app/navigation/ResponsiveNavigation/ResponsiveNavigation.tsx";
import {VowelDetailsCard} from "./components/vowel-details/VowelDetailsCard.tsx";

type NavKey = 'library' | 'listen' | 'speak' | 'stats'

const navItems: Array<{ key: NavKey; label: string; icon: ReactElement }> = [
    {key: 'library', label: 'Library', icon: <MenuBookRounded/>},
    {key: 'listen', label: 'Listen', icon: <HeadphonesRounded/>},
    {key: 'speak', label: 'Speak', icon: <MicRounded/>},
    {key: 'stats', label: 'Stats', icon: <InsightsRounded/>},
]

function App() {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const [active, setActive] = useState<NavKey>('listen')

    return (
        <ThemeProvider theme={theme}>
            <ResponsiveNavigation isDesktop={isDesktop} items={navItems} value={active} onChange={setActive}>
                {/*<h2 style={{
                    margin: '8px',
                    fontSize: '24px',
                    color: '#0f172a'
                }}>
                    {navItems.find((item) => item.key === active)?.label}
                </h2>*/}

                <Box className={isDesktop ? 'shell shell--desktop' : 'shell'}>
                    <VowelDetailsCard/>
                </Box>
            </ResponsiveNavigation>
        </ThemeProvider>
    )
}

export default App
