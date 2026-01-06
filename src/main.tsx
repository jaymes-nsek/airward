import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

const theme = createTheme({
    // Customise palette/typography later
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </StrictMode>,
)
