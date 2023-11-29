import React, { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';

interface ThemeProviderProps {
    children: ReactNode;
}

const theme = createTheme({
    palette: {
        secondary: {
            main: '#008cd7',
        },
        mode: 'dark',
        primary: {
            main: '#2c719a',
        },
    },
});

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
};

export default ThemeProvider;
