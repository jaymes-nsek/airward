import {type ReactNode} from 'react';
import {AppBar, BottomNavigation, BottomNavigationAction, Box, Paper, Tab, Tabs, Toolbar,} from '@mui/material'
import {BrandLogo} from "../../../components/brand-logo/BrandLogo.tsx";
import type {NavItem} from "../../../App.tsx";
import "./ResponsiveNavigation.scss"
import {useNavRouting} from "../useNavRouting.ts";

type NavKey = 'library' | 'listen' | 'speak' | 'stats'

type MainNavigationProps = {
    isDesktop: boolean
    children: ReactNode
    mainStyle?: React.CSSProperties
}

type ResponsiveNavigationProps = {
    isDesktop: boolean
    items: NavItem[]
}

const APP_BAR_HEIGHT = 72
const MOBILE_APP_BAR_HEIGHT = 64 // MUI default toolbar height on mobile (typically 56, but safe to be explicit)
const BOTTOM_NAV_HEIGHT = 56      // MUI BottomNavigation default height

export function MainWrapper({
                                isDesktop,
                                children,
                                mainStyle
                            }: MainNavigationProps) {
    // Assign device-width-specific main HTML element
    return isDesktop ?
        <Box
            className="responsive-navigation__main"
            component="main"
            sx={{
                pt: `${(APP_BAR_HEIGHT + 16)}px`, // offset for fixed AppBar
                px: '16px', // {xs: 2, lg: 4}
            }}
            style={mainStyle}
        >
            {children}
        </Box>
        :
        <Box
            className="responsive-navigation__main"
            component="main"
            sx={{
                pt: `${MOBILE_APP_BAR_HEIGHT + 12}px`, // space for top AppBar
                pb: `${BOTTOM_NAV_HEIGHT}px`,     // space for bottom nav
                px: {xs: '0px', sm: '12px'},
            }}
            style={mainStyle}
        >
            {children}
        </Box>
}

export function AppBarWrapper({
                                  isDesktop,
                                  items,
                              }: ResponsiveNavigationProps) {
    const {activeKey, handleNavChange} = useNavRouting(items)

    if (isDesktop)
        return <>
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
        </>

    return (
        <>
            <AppBar position="fixed" elevation={4}>
                <Toolbar sx={{minHeight: MOBILE_APP_BAR_HEIGHT}}>
                    <BrandLogo height={28}/>
                </Toolbar>
            </AppBar>
        </>
    )
}


export function BottomNavWrapper({
                                     isDesktop,
                                     items,
                                 }: ResponsiveNavigationProps) {
    const {activeKey, handleNavChange} = useNavRouting(items)

    if (isDesktop) {
        return <> </>
    }

    return <>
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
}
