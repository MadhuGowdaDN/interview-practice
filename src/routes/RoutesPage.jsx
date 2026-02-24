// src/Routes.jsx
// import CssBaseline from "@common";
import { ThemeProvider, createTheme } from "@common";
import { BrowserRouter, Route, Routes } from "@react";

// Components
import Assessments from "../components/assessments/Assessments";
import Dashboard from "../components/dashboard/Dashboard";
import InterviewSession from '../components/interview/InterviewSession';
import Login from '../components/login/Page';
import Welcome from "../components/welcome/Welcome";
import SecureRoute from './SecureRoute';
// import Dashboard from './components/Dashboard';
// import Practice from './components/Practice';
// import Coding from './components/Coding';
// import Resources from './components/Resources';
// import Progress from './components/Progress';
// import Profile from './components/Profile';
// import Settings from './components/Settings';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#e6e9ff',
      dark: '#5a67d8',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function RoutesPage() {
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Login />}
          />
          <Route element={<SecureRoute />}>
            <Route
              path="/welcome"
              element={<Welcome />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/assessments"
              element={<Assessments />}
            />
            <Route
              path="/interview"
              element={<InterviewSession />}
            />

            {/* Protected Routes - All inside SecureRoute */}
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} /> */}
          </Route>

          {/* Default redirect */}
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default RoutesPage;