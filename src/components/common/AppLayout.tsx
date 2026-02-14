import { AppBar, Box, Button, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom';
import { APP_NAME } from '@constants/config';
import { useAuthStore } from '@features/authSlice';
import { useThemeStore } from '@features/themeSlice';

const navItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Create Exam', to: '/create-exam' },
  { label: 'Reports', to: '/reports' }
];

export const AppLayout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const mode = useThemeStore((s) => s.mode);
  const toggleMode = useThemeStore((s) => s.toggleMode);

  return (
    <Box minHeight="100vh">
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {APP_NAME}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
            {navItems.map((item) => (
              <Button key={item.to} color="inherit" component={RouterLink} to={item.to}>
                {item.label}
              </Button>
            ))}
          </Stack>
          <IconButton onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
          <Button
            sx={{ ml: 1 }}
            variant="contained"
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }} maxWidth="xl">
        <Outlet />
      </Container>
    </Box>
  );
};
