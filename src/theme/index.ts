import { createTheme } from '@mui/material/styles';

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
    },
});
