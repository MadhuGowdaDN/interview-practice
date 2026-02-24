// src/components/SecureRoute.jsx
import { chekIsUserActive } from '@features';
import {
  Assessment as AssessmentIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Code as CodeIcon,
  Dashboard as DashboardIcon,
  Logout as LogoutIcon,
  MenuBook as MenuBookIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  Quiz as QuizIcon,
  School as SchoolIcon,
  Settings as SettingsIcon
} from "@icon";
import {
  Alert,
  AppBar,
  Avatar,
  Badge,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@common";
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from "@react";
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from "@react";

// Create Auth Context
const AuthContext = createContext(null);

// Drawer width
const drawerWidth = 280;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within SecureRoute');
  }
  return context;
};

const SecureRoute = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // State management
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [authState, setAuthState] = useState({
    isAuthenticated: true,
    isLoading: false,
    user: null,
    error: null,
  });
  const [apiCallCompleted, setApiCallCompleted] = useState(true);
  const dispatch = useDispatch();
  // Navigation items
  const navigationItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Practice', icon: <QuizIcon />, path: '/practice' },
    { text: 'Coding Challenges', icon: <CodeIcon />, path: '/coding' },
    { text: 'Study Resources', icon: <MenuBookIcon />, path: '/resources' },
    { text: 'Progress', icon: <AssessmentIcon />, path: '/progress' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  ];

  // Mock API call for security check
  const checkAuthentication = async () => {
    dispatch(chekIsUserActive({})).then(res => {
      if (!res?.payload) {
        navigate("/");
      }
    })
  };

  // Run authentication check on mount and when location changes
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Handle drawer toggle
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  // Handle menu open
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle notifications open
  const handleNotificationsOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  // Handle notifications close
  const handleNotificationsClose = () => {
    setNotificationAnchor(null);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call logout API
      await axios.post('https://api.example.com/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userPreferences');

      // Navigate to login
      navigate('/login', { replace: true });
    }
  };

  // Loading state
  if (authState.isLoading || !apiCallCompleted) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: 'white', mb: 3 }} />
          <Typography variant="h6" sx={{ color: 'white' }}>
            Verifying your credentials...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (authState.error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Box sx={{ maxWidth: 400, p: 3 }}>
          <Alert
            severity="error"
            variant="filled"
            sx={{ mb: 2 }}
          >
            {authState.error}
          </Alert>
          <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
            Redirecting to login page...
          </Typography>
        </Box>
      </Box>
    );
  }

  // Authenticated state - Render the main app layout
  return (
    <AuthContext.Provider value={{ user: authState.user, logout: handleLogout }}>
      <Box sx={{ display: 'flex' }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(open && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Interview-Practice
            </Typography>

            {/* Streak Chip */}
            <Chip
              icon={<SchoolIcon />}
              label={`${authState.user?.streak || 0} day streak`}
              size="small"
              sx={{
                mr: 2,
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                '& .MuiChip-icon': { color: 'white' },
              }}
            />

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleNotificationsOpen}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* User Menu */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  {authState.user?.avatar || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>

            {/* User Menu Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>

            {/* Notifications Menu */}
            <Menu
              anchorEl={notificationAnchor}
              open={Boolean(notificationAnchor)}
              onClose={handleNotificationsClose}
              onClick={handleNotificationsClose}
              PaperProps={{
                sx: { width: 320, maxHeight: 400 }
              }}
            >
              <MenuItem>
                <ListItemText
                  primary="New coding challenge available"
                  secondary="2 hours ago"
                />
              </MenuItem>
              <MenuItem>
                <ListItemText
                  primary="Your progress report is ready"
                  secondary="Yesterday"
                />
              </MenuItem>
              <MenuItem>
                <ListItemText
                  primary="Upcoming mock interview"
                  secondary="Tomorrow at 10 AM"
                />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={open}
          onClose={handleDrawerToggle}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            },
          }}
        >
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 2 }}>
            <IconButton onClick={handleDrawerToggle}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>

          <Divider />

          {/* User Info in Drawer */}
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 1,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {authState.user?.avatar || 'U'}
            </Avatar>
            <Typography variant="h6">{authState.user?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {authState.user?.email}
            </Typography>
            <Chip
              label={`Progress: ${authState.user?.progress || 0}%`}
              size="small"
              color="primary"
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider />

          {/* Navigation List */}
          <List>
            {navigationItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: '0 24px 24px 0',
                    mr: 2,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.light',
                      color: 'primary.main',
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      },
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'inherit',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          {/* Bottom Section */}
          <Box sx={{ mt: 'auto', p: 2 }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigation('/settings')}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="caption" color="text.secondary" align="center" display="block">
              Version 1.0.0
            </Typography>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
          }}
        >
          <Toolbar /> {/* Spacer for AppBar */}
          <Outlet /> {/* This renders the child routes */}
        </Box>
      </Box>
    </AuthContext.Provider>
  );
};

export default SecureRoute;