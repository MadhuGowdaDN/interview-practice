import { ChevronLeft as ChevronLeftIcon } from "@icon";
import { Box, IconButton, Typography, useTheme } from "@common";
import { styled } from "@common";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
}));

const SidebarHeader = ({ onDrawerClose }) => {
    const theme = useTheme();

    return (
        <DrawerHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    mr: 2
                }}>
                    A
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Admin<span style={{ color: theme.palette.primary.main }}>Hub</span>
                </Typography>
            </Box>
            <IconButton onClick={onDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </DrawerHeader>
    );
};

export default SidebarHeader;