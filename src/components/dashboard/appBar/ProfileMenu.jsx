import {
    AccountCircle,
    Logout as LogoutIcon,
    Settings as SettingsIcon
} from "@icon";
import {
    Avatar,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Tooltip
} from "@common";
import { useState } from "@react";

const ProfileMenu = ({ user = { name: 'John Doe', avatar: null } }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout = () => {
        handleMenuClose();
        // Add logout logic here
    };

    const handleSettings = () => {
        handleMenuClose();
        // Add settings navigation here
    };

    const handleProfile = () => {
        handleMenuClose();
        // Add profile navigation here
    };

    return (
        <>
            <Tooltip title="Account">
                <IconButton onClick={handleMenuOpen} edge="end">
                    <Avatar sx={{ width: 40, height: 40 }}>
                        {user.avatar ? <img src={user.avatar} alt={user.name} /> : user.name.charAt(0)}
                    </Avatar>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleProfile}>
                    <AccountCircle sx={{ mr: 2 }} />
                    Profile
                </MenuItem>
                <MenuItem onClick={handleSettings}>
                    <SettingsIcon sx={{ mr: 2 }} />
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                    <LogoutIcon sx={{ mr: 2 }} />
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default ProfileMenu;