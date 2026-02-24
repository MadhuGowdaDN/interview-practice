import { People as PeopleIcon } from "@icon";
import { Avatar, Box, Paper, Typography, alpha, useTheme } from "@common";

const RecentActivity = ({ activities = [] }) => {
    const theme = useTheme();

    const defaultActivities = [
        { id: 1, title: 'New user registered', time: '5 minutes ago', icon: <PeopleIcon /> },
        { id: 2, title: 'Assessment completed', time: '15 minutes ago', icon: <PeopleIcon /> },
        { id: 3, title: 'New order placed', time: '1 hour ago', icon: <PeopleIcon /> },
        { id: 4, title: 'System update', time: '2 hours ago', icon: <PeopleIcon /> },
    ];

    const displayActivities = activities.length > 0 ? activities : defaultActivities;

    return (
        <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }} elevation={1}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>Recent Activity</Typography>
            {displayActivities.map((activity) => (
                <Box key={activity.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                        <Box sx={{ color: theme.palette.primary.main, fontSize: 20 }}>{activity.icon}</Box>
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{activity.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                    </Box>
                </Box>
            ))}
        </Paper>
    );
};

export default RecentActivity;