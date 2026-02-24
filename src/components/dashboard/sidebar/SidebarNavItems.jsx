import {
    Assessment as AssessmentIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    ShoppingCart as ShoppingCartIcon
} from "@icon";
import { alpha, Badge, Box, List, MenuItem, Typography, useTheme } from "@common";
import { useNavigate } from "@react";

const SidebarNavItems = ({ onItemClick }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const mainNavItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', active: true },
        { text: 'Assessments', icon: <PeopleIcon />, path: '/assessments', count: 24 },
        { text: 'Users', icon: <PeopleIcon />, path: '/users', count: 24 },
        { text: 'Orders', icon: <ShoppingCartIcon />, path: '/orders', count: 12 },
        { text: 'Analytics', icon: <AssessmentIcon />, path: '/analytics' },
        { text: 'Reports', icon: <AssessmentIcon />, path: '/reports' },
    ];

    const bottomNavItems = [
        { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        if (onItemClick) onItemClick();
    };

    return (
        <>
            <List sx={{ px: 2 }}>
                {mainNavItems.map((item) => (
                    <Box
                        key={item.text}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            bgcolor: item.active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                            '&:hover': {
                                bgcolor: item.active ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.action.hover, 0.1),
                            },
                        }}
                    >
                        <MenuItem
                            sx={{ py: 1.5, px: 2 }}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <Box sx={{ color: item.active ? theme.palette.primary.main : 'text.secondary', mr: 2 }}>
                                {item.icon}
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    flexGrow: 1,
                                    color: item.active ? theme.palette.primary.main : 'text.secondary',
                                    fontWeight: item.active ? 600 : 400
                                }}
                            >
                                {item.text}
                            </Typography>
                            {item.count && (
                                <Badge badgeContent={item.count} color="primary" max={99} />
                            )}
                        </MenuItem>
                    </Box>
                ))}
            </List>

            <List sx={{ px: 2, mt: 2 }}>
                {bottomNavItems.map((item) => (
                    <Box
                        key={item.text}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: alpha(theme.palette.action.hover, 0.1),
                            },
                        }}
                    >
                        <MenuItem
                            sx={{ py: 1.5, px: 2 }}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <Box sx={{ color: 'text.secondary', mr: 2 }}>
                                {item.icon}
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    flexGrow: 1,
                                    color: 'text.secondary'
                                }}
                            >
                                {item.text}
                            </Typography>
                        </MenuItem>
                    </Box>
                ))}
            </List>
        </>
    );
};

export default SidebarNavItems;