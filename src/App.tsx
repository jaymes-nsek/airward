import MenuBookRounded from '@mui/icons-material/MenuBookRounded'
import HeadphonesRounded from '@mui/icons-material/HeadphonesRounded'
import MicRounded from '@mui/icons-material/MicRounded'
import InsightsRounded from '@mui/icons-material/InsightsRounded'
import {type CSSProperties, type ReactElement, useEffect} from 'react'
import {useMediaQuery,} from '@mui/material'
import './App.scss'
import {
    AppBarWrapper,
    BottomNavWrapper,
    MainWrapper
} from "./app/navigation/ResponsiveNavigation/ResponsiveNavigation.tsx";
import {theme} from "./theme";
import {Outlet, useMatches} from "react-router-dom"


type NavKey = 'library' | 'listen' | 'speak' | 'stats'

export type NavItem = {
    key: NavKey;
    label: string;
    icon: ReactElement;
    to: string;
};

const navItems: NavItem[] = [
    {key: 'library', label: 'Library', icon: <MenuBookRounded/>, to: '/library'},
    {key: 'listen', label: 'Listen', icon: <HeadphonesRounded/>, to: '/listen'},
    {key: 'speak', label: 'Speak', icon: <MicRounded/>, to: '/speak'},
    {key: 'stats', label: 'Stats', icon: <InsightsRounded/>, to: '/stats'},
]

type TitleLoaderData = { title?: string }

const FALLBACK_TITLE = 'Airward'

function useActiveRouteTitle() {
    const matches = useMatches()

    // Find the deepest matched route that actually has loader data with a title
    for (let i = matches.length - 1; i >= 0; i--) {
        const data = matches[i].data as TitleLoaderData | undefined
        if (data?.title) return data.title
    }

    return FALLBACK_TITLE
}


function App() {
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    const title = useActiveRouteTitle()

    useEffect(() => {
        document.title = title === FALLBACK_TITLE ? FALLBACK_TITLE : `${title} | Airward`
    }, [title])


    return (
        <>
            <AppBarWrapper isDesktop={isDesktop} items={navItems}/>

            <MainWrapper
                isDesktop={isDesktop}
                mainStyle={{
                    '--background-default': theme.palette.background.default,
                } as CSSProperties}
            >
                <h1 className="visually-hidden">{title}</h1>

                <Outlet/>
            </MainWrapper>

            <BottomNavWrapper isDesktop={isDesktop} items={navItems}/>
        </>
    )
}

export default App
