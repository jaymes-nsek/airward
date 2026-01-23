import {type ReactNode} from 'react';
import {
    AppBar,
    type AppBarProps,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    type BoxProps,
    Paper,
    type PaperProps,
    Tab,
    Tabs,
    Toolbar,
} from '@mui/material'
import {BrandLogo} from "../../../components/brand-logo/BrandLogo.tsx";
import "./ResponsiveNavigation.scss"
import {useNavRouting} from "../useNavRouting.ts";
import type {NavItem} from "../nav-items.tsx";

type NavKey = 'library' | 'listen' | 'speak' | 'stats'

type MainNavProps = BoxProps & {
    children: ReactNode
}

type AppBarNavProps = AppBarProps & {
    isDesktop: boolean
    items: NavItem[]
}

type BottomNavigationNavProps = PaperProps & {
    isDesktop: boolean
    items: NavItem[]
}

const APP_BAR_HEIGHT = 72
const MOBILE_APP_BAR_HEIGHT = 64 // MUI default toolbar height on mobile (typically 56, but safe to be explicit)
const BOTTOM_NAV_HEIGHT = 56      // MUI BottomNavigation default height

export function MainWrapper({
                                children,
                                ...rest
                            }: MainNavProps) {
    // Assign device-width-specific main HTML element
    return (
        <Box
            className="responsive-navigation__main"
            component="main"
            {...rest}
        >
            {children}
        </Box>
    )
}

export function AppBarWrapper({
                                  isDesktop,
                                  items,
                                  ...rest
                              }: AppBarNavProps) {
    const {activeKey, handleNavChange} = useNavRouting(items)

    if (isDesktop) {
        return <>
            <AppBar
                position="fixed"
                elevation={1}
                className="responsive-navigation__app-bar"
                {...rest}
            >
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
    }

    return (
        <>
            <AppBar
                position="fixed"
                elevation={4}
                {...rest}
            >
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
                                     ...rest
                                 }: BottomNavigationNavProps) {
    const {activeKey, handleNavChange} = useNavRouting(items)

    if (isDesktop) {
        return <> </>
    }

    return <>
        <Paper
            elevation={8}
            {...rest}
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
