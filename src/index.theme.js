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
            width: '0.5rem', // Larghezza della scrollbar
          },
          '::-webkit-scrollbar-track': {
            background: 'transparent', // Pista trasparente
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: '1rem', // Angoli arrotondati della maniglia
            backgroundColor: '#dbdada', // Colore della maniglia
          },

        }
      }
    }
  }
});

export default theme;
