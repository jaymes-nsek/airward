import {Box} from '@mui/material'
import logo from './../../assets/airward_logo_yellow.svg'
import {NavLink} from "react-router-dom";
import {PAGES_NAV_ROUTES} from "../../app/navigation/nav-items.tsx";

type BrandLogoProps = {
    height?: number
}

export function BrandLogo({height = 32}: BrandLogoProps) {
    return (
        <Box
            component={NavLink}
            to={PAGES_NAV_ROUTES.LIBRARY}
            sx={{display: 'flex', alignItems: 'center', gap: 1.5}}
        >
            <Box
                component="img"
                src={logo}
                alt="Airward logo"
                sx={{height, width: 'auto'}}
                aria-hidden="false"
            />
        </Box>
    )
}
