import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {theme} from './theme';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {AppRouter} from "./app/providers/AppRouter.tsx";
import {StyledEngineProvider} from "@mui/material/styles";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/*Use StyledEngineProvider to ensure App styles override MUI*/}
            <StyledEngineProvider injectFirst>
                <AppRouter/>
            </StyledEngineProvider>
        </ThemeProvider>
    </StrictMode>,
)
