import { createTheme } from '@mui/material/styles';
import {alpha} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1e3a8a',        // deep academic blue
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#facc15',        // golden yellow
            contrastText: '#1e293b',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff'
        },
        text: {
            primary: '#0f172a', // '#fff'
            secondary: '#facc15', // #475569
        },
        divider: '#e2e8f0',
    },

    components: {
        MuiAppBar: {
            defaultProps: {
                color: 'primary',
            },
        },

        // Tabs defaults (THIS is where indicatorColor/textColor belong)
        MuiTabs: {
            defaultProps: {
                indicatorColor: 'secondary',
                textColor: 'primary',
            },
        },

        MuiTab: {
            styleOverrides: {
                root: ({ theme }) => ({
                    textTransform: 'none',
                    fontWeight: 600,
                    minHeight: 72,

                    // default (unselected)
                    color: theme.palette.primary.contrastText,

                    // selected
                    '&.Mui-selected': {
                        color: theme.palette.secondary.main,
                    },
                }),
            },
        },

        MuiBottomNavigation: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: theme.palette.primary.main,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    height: 64,
                }),
            },
        },

        MuiBottomNavigationAction: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.contrastText,
                    '&.Mui-selected': {
                        color: theme.palette.text.secondary,
                    },
                }),
                label: {
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    '&.Mui-selected': {
                        fontWeight: 600,
                    },
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.secondary.contrastText,
                    fontSize: '1rem',
                }),

                outlined: ({ theme }) => ({
                    color: theme.palette.secondary.contrastText,
                    borderColor: theme.palette.divider,
                }),

                filled: ({ theme }) => ({
                    color: theme.palette.common.white,
                }),
            },
        },

        MuiListItemButton: {
            styleOverrides: {
                // NB: When access to theme.palette is sorted, styleOverrides.root must be a function:
                root: ({ theme }) => ({
                    // 1) Hover underline for ALL items (selected or not)
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                        textDecoration: 'underline',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '3px',
                    },

                    // 2) Selected styling (keeps underline too)
                    '&.Mui-selected': {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.4),
                        textDecoration: 'underline',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '3px',
                    },

                    // 3) Selected + hover
                    '&.Mui-selected:hover': {
                        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
                    },

                    // 4) Keyboard focus visibility for ALL items
                    '&.Mui-focusVisible': {
                        outline: `2px solid ${alpha(theme.palette.secondary.main, 0.6)}`,
                        outlineOffset: 2,
                        // Optional: also underline on focus, for parity with hover
                        textDecoration: 'underline',
                        textDecorationThickness: '2px',
                        textUnderlineOffset: '3px',
                    },
                }),
            },
        },
    },


    typography: {
        h2: {
            fontSize: '1.6rem',
            /*lineHeight: 1.2,
            fontWeight: 600,*/
        },
        h3: {
            fontSize: '1rem',
            /*lineHeight: 1.2,
            fontWeight: 600,*/
        },
        h4: {
            fontSize: '1rem',
            /*lineHeight: 1.2,
            fontWeight: 600,*/
        }
    }
});
