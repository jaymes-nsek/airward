import {type ReactNode} from 'react';
import {
    AppBar,
    type AppBarProps,
    BottomNavigation,
    BottomNavigationAction,
    type BottomNavigationProps,
    Box,
    type BoxProps,
    Tab,
    Tabs,
    Toolbar,
} from '@mui/material'
import {BrandLogo} from "../../../components/brand-logo/BrandLogo.tsx";
import "./ResponsiveNavigation.scss"
import {type NavItem} from "../nav-items.tsx";
import {NavLink} from "react-router-dom";

type MainNavProps = BoxProps & {
    children: ReactNode
}

type AppBarNavProps = AppBarProps & {
    isDesktop: boolean
    items: NavItem[]
}

type BottomNavigationNavProps = BottomNavigationProps & {
    isDesktop: boolean
    items: NavItem[]
}

function getActiveTo(pathname: string, items: NavItem[],): string | false {
    // Determine which tab is active by matching the current URL.
    // This supports nested routes (e.g. /library/123 still highlights /library).
    return (
        items.find(
            (item) =>
                pathname === item.to ||
                pathname.startsWith(`${item.to}/`),
        )?.to ?? false
    );
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
    const activeTo = getActiveTo(location.pathname, items);

    if (isDesktop) {
        return <>
            <AppBar
                position="fixed"
                elevation={1}
                className="responsive-navigation__app-bar"
                {...rest}
            >
                <Toolbar sx={{gap: 3, px: {xs: 2, lg: 4}, minHeight: APP_BAR_HEIGHT}}>
                    <BrandLogo/>

                    <Box component="nav" aria-label="Primary navigation"
                         sx={{minHeight: APP_BAR_HEIGHT, display: 'flex'}}>
                        <Tabs
                            value={activeTo}
                            sx={{minHeight: APP_BAR_HEIGHT}}
                        >
                            {items.map((item) => (
                                <Tab
                                    key={item.key}
                                    label={item.label}
                                    value={item.to}
                                    component={NavLink}
                                    to={item.to}
                                    // Ensures correct active behaviour if nested routes are used in future
                                    end={item.to === '/'}
                                />
                            ))}
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    }

    return (
        <AppBar
            position="fixed"
            elevation={4}
            {...rest}
        >
            <Toolbar sx={{minHeight: MOBILE_APP_BAR_HEIGHT}}>
                <BrandLogo height={28}/>
            </Toolbar>
        </AppBar>
    )
}


export function BottomNavWrapper({
                                     isDesktop,
                                     items,
                                     ...rest
                                 }: BottomNavigationNavProps) {
    if (isDesktop) {
        return <> </>
    }

    const activeTo = getActiveTo(location.pathname, items);

    return (
        <BottomNavigation
            component="nav"
            aria-label="Primary navigation"
            showLabels
            value={activeTo}
            sx={{height: BOTTOM_NAV_HEIGHT}}
            elevation={8}
            {...rest}
        >
            {items.map((item) => (
                <BottomNavigationAction
                    key={item.key}
                    label={item.label}
                    icon={item.icon}
                    value={item.to}
                    component={NavLink}
                    to={item.to}
                />
            ))}
        </BottomNavigation>
    )
}
