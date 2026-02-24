import {
    Assessment as AssessmentIcon,
    People as PeopleIcon,
    Timer as TimerIcon,
    TrendingUp as TrendingUpIcon
} from "@icon";
import {
    alpha,
    Avatar,
    Box,
    Grid,
    Paper,
    Skeleton,
    Typography,
    useTheme
} from "@common";

const StatsOverview = ({ stats, loading = false }) => {
    const theme = useTheme();

    const defaultStats = [
        {
            icon: <AssessmentIcon />,
            value: stats?.totalAssessments || '24',
            label: 'Total Assessments',
            color: theme.palette.primary.main,
            bgColor: alpha(theme.palette.primary.main, 0.1)
        },
        {
            icon: <PeopleIcon />,
            value: stats?.candidatesTested || '558',
            label: 'Candidates Tested',
            color: '#4CAF50',
            bgColor: alpha('#4CAF50', 0.1)
        },
        {
            icon: <TrendingUpIcon />,
            value: stats?.averageScore ? `${Math.round(stats.averageScore)}%` : '78%',
            label: 'Average Score',
            color: '#FF9800',
            bgColor: alpha('#FF9800', 0.1)
        },
        {
            icon: <TimerIcon />,
            value: stats?.avgDuration ? Math.round(stats.avgDuration).toString() : '81',
            label: 'Avg Duration (min)',
            color: '#f44336',
            bgColor: alpha('#f44336', 0.1)
        }
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {defaultStats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                sx={{
                                    bgcolor: stat.bgColor,
                                    color: stat.color,
                                    width: 48,
                                    height: 48
                                }}
                            >
                                {stat.icon}
                            </Avatar>
                            <Box>
                                {loading ? (
                                    <>
                                        <Skeleton variant="text" width={60} height={40} />
                                        <Skeleton variant="text" width={80} height={20} />
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default StatsOverview;