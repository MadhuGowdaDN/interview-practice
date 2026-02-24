import {
    Notifications as NotificationsIcon
} from "@icon";
import {
    Badge,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@common";
import { useState } from "@react";

const NotificationsMenu = ({ notifications = [] }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const defaultNotifications = [
        { id: 1, title: 'New user registered', time: '5 minutes ago' },
        { id: 2, title: 'Server update completed', time: '1 hour ago' },
        { id: 3, title: 'Payment received', time: '2 hours ago' },
        { id: 4, title: 'New assessment created', time: '3 hours ago' }
    ];

    const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton onClick={handleOpen}>
                    <Badge badgeContent={displayNotifications.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
            >
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6">Notifications</Typography>
                </Box>
                {displayNotifications.map((notification) => (
                    <MenuItem key={notification.id} onClick={handleClose}>
                        <Box sx={{ py: 1 }}>
                            <Typography variant="subtitle2">{notification.title}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {notification.time}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default NotificationsMenu;