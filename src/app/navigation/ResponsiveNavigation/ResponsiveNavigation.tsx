import {type ReactNode, useMemo} from 'react';
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
    Tab,
    Tabs,
    Toolbar,
} from '@mui/material'
import {BrandLogo} from "../../../components/brand-logo/BrandLogo.tsx";
import {useLocation, useNavigate} from 'react-router-dom';
import type {NavItem} from "../../../App.tsx";

type NavKey = 'library' | 'listen' | 'speak' | 'stats'

type ResponsiveNavigationProps = {
    isDesktop: boolean
    items: NavItem[]
    children: ReactNode
}

const APP_BAR_HEIGHT = 72
const MOBILE_APP_BAR_HEIGHT = 64 // MUI default toolbar height on mobile (typically 56, but safe to be explicit)
const BOTTOM_NAV_HEIGHT = 56      // MUI BottomNavigation default height


export function ResponsiveNavigation({
                                         isDesktop,
                                         items,
                                         children,
                                     }: ResponsiveNavigationProps) {
    const navigate = useNavigate();
    const location = useLocation();

    // const paths = useMemo(() => items.map((i) => i.to), [items]);

    // Derive active NavKey from the current URL
    const activeKey = useMemo<NavKey>(() => {
        const match = items.find((item) => item.to === location.pathname);
        return match?.key ?? items[0].key;
    }, [items, location.pathname]);

    // console.log('currentIndex', activeKey);

    function handleNavChange(newKey: NavKey) {
        const item = items.find(i => i.key === newKey);
        if (item) {
            navigate(item.to);
        }
    }

    if (isDesktop) {
        return (
            <>
                <AppBar position="fixed" elevation={1}>
                    <Toolbar sx={{gap: 3, px: {xs: 2, lg: 4}, minHeight: APP_BAR_HEIGHT}}>
                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}>
                            <BrandLogo/>
                        </Box>

                        <Tabs
                            value={activeKey}
                            onChange={(_, newKey: NavKey) => handleNavChange(newKey)}
                            sx={{minHeight: APP_BAR_HEIGHT}}
                        >
                            {items.map((item) => (
                                <Tab
                                    key={item.key}
                                    label={item.label}
                                    value={item.key}/>
                            ))}
                        </Tabs>
                    </Toolbar>
                </AppBar>

                <Box
                    component="main"
                    sx={{
                        pt: `${APP_BAR_HEIGHT}px`, // offset for fixed AppBar
                        px: {xs: 2, lg: 4},
                    }}
                >
                    {children}
                </Box>
            </>
        )
    }

    return (
        <>
            <AppBar position="fixed" elevation={4}>
                <Toolbar sx={{minHeight: MOBILE_APP_BAR_HEIGHT}}>
                    <BrandLogo height={28}/>
                </Toolbar>
            </AppBar>

            <Box
                component="main"
                sx={{
                    pt: `${MOBILE_APP_BAR_HEIGHT}px`, // space for top AppBar
                    pb: `${BOTTOM_NAV_HEIGHT}px`,     // space for bottom nav
                    // px: 2,
                }}
            >
                {children}
            </Box>

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
                    value={activeKey}
                    onChange={(_, newKey: NavKey) => handleNavChange(newKey)}
                    sx={{height: BOTTOM_NAV_HEIGHT}}
                >
                    {items.map((item) => (
                        <BottomNavigationAction
                            key={item.key}
                            label={item.label}
                            icon={item.icon}
                            value={item.key}
                        />
                    ))}
                </BottomNavigation>
            </Paper>
        </>
    )
}
