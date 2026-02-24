import { Box } from "@common";
import { styled } from "@common";
import { useState } from "@react";

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const DashboardLayout = ({ children, sidebar, appBar }) => {
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {appBar && appBar({ open, onDrawerOpen: handleDrawerOpen })}
            {sidebar && sidebar({ open, onDrawerClose: handleDrawerClose })}
            <Main open={open}>
                <div style={{ height: '64px' }} /> {/* Toolbar spacer */}
                {children}
            </Main>
        </Box>
    );
};

export default DashboardLayout;