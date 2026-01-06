import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import HeadphonesRounded from '@mui/icons-material/HeadphonesRounded'
import MicRounded from '@mui/icons-material/MicRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import {useState, type ReactElement} from 'react'
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import './App.css'
import logo from './assets/airward_logo.svg'

type NavKey = 'library' | 'listen' | 'speak' | 'stats'

const navItems: Array<{ key: NavKey; label: string; icon: ReactElement }> = [
    {key: 'library', label: 'Library', icon: <MenuBookRounded/>},
    {key: 'listen', label: 'Listen', icon: <HeadphonesRounded/>},
    {key: 'speak', label: 'Speak', icon: <MicRounded/>},
    {key: 'stats', label: 'Stats', icon: <InsightsRounded/>},
]

function App() {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const [active, setActive] = useState<NavKey>('listen')

    return (
        <div className={`shell ${isDesktop ? 'shell--desktop' : ''}`}>
            {isDesktop && (
                <>
                    <AppBar
                        position="fixed"
                        color="inherit"
                        elevation={1}
                        sx={{backgroundColor: '#ffffff'}}
                    >
                        <Toolbar sx={{gap: 3, px: {xs: 2, lg: 4}, minHeight: 72}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
                                <Box
                                    component="img"
                                    src={logo}
                                    alt="Airward logo"
                                    sx={{height: 32, width: 'auto'}}
                                />
                                <Typography
                                    variant="h6"
                                    component="div"
                                    sx={{fontWeight: 800, color: '#1f2937'}}
                                >
                                    Airward
                                </Typography>
                            </Box>

                            <Tabs
                                value={active}
                                onChange={(_, newValue) => setActive(newValue as NavKey)}
                                textColor="primary"
                                indicatorColor="primary"
                                sx={{
                                    minHeight: 72,
                                    '& .MuiTab-root': {textTransform: 'none', fontWeight: 600, minHeight: 72},
                                }}
                            >
                                {navItems.map((item) => (
                                    <Tab key={item.key} label={item.label} value={item.key}/>
                                ))}
                            </Tabs>
                        </Toolbar>
                    </AppBar>
                    <Toolbar sx={{minHeight: 72}}/>
                </>
            )}

            <header className="shell__header">
                <div className="header__meta">
                    <span className="brand">Airward</span>
                    <span className="pill">Practice</span>
                </div>
                <p className="header__subtitle">
                    Navigate between learning tools with the top bar on desktop or the bottom bar on mobile and
                    tablet.
                </p>
            </header>

            <main className="shell__main">
                <div className="card card--ghost">
                    <p className="card__eyebrow">Active view</p>
                    <h2 className="card__title">
                        {navItems.find((item) => item.key === active)?.label}
                    </h2>
                    <p className="card__body">
                        This placeholder content shows which section is selected in the
                        bottom navigation. On mobile and tablet, the navigation is pinned to
                        the bottom with elevated styling.
                    </p>
                </div>
            </main>

            {!isDesktop && (
                <Paper
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: (muiTheme) => muiTheme.zIndex.appBar,
                    }}
                    elevation={8}
                >
                    <BottomNavigation
                        showLabels
                        value={active}
                        onChange={(_, newValue) => setActive(newValue as NavKey)}
                    >
                        {navItems.map((item) => (
                            <BottomNavigationAction
                                key={item.key}
                                label={item.label}
                                icon={item.icon}
                                value={item.key}
                            />
                        ))}
                    </BottomNavigation>
                </Paper>
            )}
        </div>
    )
}

export default App
