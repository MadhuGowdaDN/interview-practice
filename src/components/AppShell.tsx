import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useThemeMode } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';

const AppShell = () => {
  const { darkMode, toggleMode } = useThemeMode();
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <Box minHeight="100vh">
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <Typography component={Link} to="/dashboard" color="inherit" sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 700 }}>
            InterviewPro AI
          </Typography>
          <IconButton onClick={toggleMode} color="inherit">{darkMode ? <Brightness7 /> : <Brightness4 />}</IconButton>
          {token && (
            <Button
              color="inherit"
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AppShell;
