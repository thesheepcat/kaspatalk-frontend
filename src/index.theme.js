import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6dc1b4', // blue color for primary
    },
    secondary: {
      main: '#dc004e', // pink color for secondary
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '::-webkit-scrollbar': {
            width: '0.5rem',
          },
          '::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: '1rem',
            backgroundColor: '#dbdada',
          },

        }
      }
    }
  }
});

export default theme;
