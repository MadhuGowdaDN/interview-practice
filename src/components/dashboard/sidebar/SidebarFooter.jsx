import { Avatar, Box, Typography, useTheme } from "@common";

const SidebarFooter = ({ user = { name: 'John Doe', email: 'john@example.com', initials: 'JD' } }) => {
    const theme = useTheme();

    return (
        <Box sx={{ mt: 'auto', p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{user.initials}</Avatar>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SidebarFooter;