import {
    Brightness4,
    Brightness7,
    Mail as MailIcon,
    Menu as MenuIcon
} from "@icon";
import {
    AppBar,
    Badge,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    useTheme
} from "@common";
import { styled } from "@common";
import NotificationsMenu from './NotificationsMenu';
import ProfileMenu from './ProfileMenu';
import SearchBar from './SearchBar';

const drawerWidth = 280;

const StyledAppBar = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DashboardAppBar = ({ open, onDrawerOpen, onThemeToggle, user, onSearch }) => {
    const theme = useTheme();

    return (
        <StyledAppBar position="fixed" open={open} elevation={0} sx={{ bgcolor: 'white', color: 'text.primary' }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(open && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>

                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <SearchBar onSearch={onSearch} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Toggle theme">
                        <IconButton onClick={onThemeToggle}>
                            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Tooltip>

                    <NotificationsMenu />

                    <Tooltip title="Messages">
                        <IconButton>
                            <Badge badgeContent={2} color="primary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <ProfileMenu user={user} />
                </Box>
            </Toolbar>
        </StyledAppBar>
    );
};

export default DashboardAppBar;