import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {theme} from './theme';
import {CssBaseline, ThemeProvider} from "@mui/material";
import {AppRouter} from "./app/providers/AppRouter.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
      </ThemeProvider>
  </StrictMode>,
)
