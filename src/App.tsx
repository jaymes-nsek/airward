import {type CSSProperties, useEffect} from 'react'
import {useMediaQuery,} from '@mui/material'
import './App.scss'
import {
    AppBarWrapper,
    BottomNavWrapper,
    MainWrapper
} from "./app/navigation/ResponsiveNavigation/ResponsiveNavigation.tsx";
import {theme} from "./theme";
import {Outlet, useMatches} from "react-router-dom"
import {navItems} from "./app/navigation/nav-items.tsx";

type TitleLoaderData = { title?: string }

const FALLBACK_TITLE = 'Airward'

function useActiveRouteTitle() {
    const matches = useMatches()

    // Find the deepest matched route that actually has loader data with a title
    for (let i = matches.length - 1; i >= 0; i--) {
        const data = matches[i].data as TitleLoaderData | undefined
        if (data?.title) {
            return data.title
        }
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
            <AppBarWrapper
                isDesktop={isDesktop}
                items={navItems}
                className="u-fixed"
            />

            <MainWrapper
                className="app__main-wrapper u-fill"
                style={{
                    '--background-default': theme.palette.background.default,
                } as CSSProperties}
            >
                <h1 className="visually-hidden">{title}</h1>

                <Outlet/>
            </MainWrapper>

            <BottomNavWrapper
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: (muiTheme) => muiTheme.zIndex.appBar,
                }}
                isDesktop={isDesktop}
                className="u-fixed"
                items={navItems}
            />
        </>
    )
}

export default App
