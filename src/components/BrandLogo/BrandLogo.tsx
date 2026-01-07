import { Box } from '@mui/material'
import logo from './../../assets/airward_logo_yellow.svg'

type BrandLogoProps = {
    height?: number
}

export function BrandLogo({ height = 32 }: BrandLogoProps) {
    return (
        <Box
            component="img"
            src={logo}
            alt="Airward logo"
            sx={{ height, width: 'auto' }}
        />
    )
}
