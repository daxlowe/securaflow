import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    overrides: {
        MuiDataGridCell: {
            root: {
                color: '#000', // Set the desired text color
            },
        },
    },
});

const ThemeProvider: React.FC = ({ children }) => {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
