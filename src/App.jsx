// App.jsx
// import CssBaseline from "@common";
import { ThemeProvider, createTheme } from "@common";
import { Provider } from 'react-redux';
import store from './app/store';
import Routes from './routes/RoutesPage';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#e6e9ff',
      dark: '#5a67d8',
    },
    secondary: {
      main: '#764ba2',
      light: '#a27cf8',
      dark: '#6d48c5',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;