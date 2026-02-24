import { Avatar, Box, Paper, Typography, alpha, useTheme } from "@common";

const RecentUsers = ({ users = [] }) => {
    const theme = useTheme();

    const defaultUsers = [
        { id: 1, name: 'User Name 1', email: 'user1@example.com', status: 'Active' },
        { id: 2, name: 'User Name 2', email: 'user2@example.com', status: 'Active' },
        { id: 3, name: 'User Name 3', email: 'user3@example.com', status: 'Inactive' },
        { id: 4, name: 'User Name 4', email: 'user4@example.com', status: 'Active' },
        { id: 5, name: 'User Name 5', email: 'user5@example.com', status: 'Active' },
    ];

    const displayUsers = users.length > 0 ? users : defaultUsers;

    return (
        <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }} elevation={1}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Recent Users</Typography>
            {displayUsers.map((user) => (
                <Box key={user.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>{user.name.charAt(0)}</Avatar>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">{user.email}</Typography>
                        </Box>
                    </Box>
                    <Typography
                        variant="caption"
                        sx={{
                            color: user.status === 'Active' ? '#4CAF50' : '#9E9E9E',
                            bgcolor: alpha(user.status === 'Active' ? '#4CAF50' : '#9E9E9E', 0.1),
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1
                        }}
                    >
                        {user.status}
                    </Typography>
                </Box>
            ))}
        </Paper>
    );
};

export default RecentUsers;