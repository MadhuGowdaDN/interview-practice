import {
    Assessment as AssessmentIcon,
    People as PeopleIcon,
    ShoppingCart as ShoppingCartIcon,
    TrendingDown as TrendingDownIcon,
    TrendingUp as TrendingUpIcon
} from "@icon";
import {
    alpha,
    Box,
    Grid,
    Paper,
    Typography
} from "@common";
import { styled } from "@common";

const StyledCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: theme.spacing(2),
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[10],
    },
}));

const StatsCards = ({ stats = [] }) => {
    const defaultStats = [
        { title: 'Total Revenue', value: '$54,239', change: '+12.5%', icon: <TrendingUpIcon />, color: '#4CAF50' },
        { title: 'Total Users', value: '8,549', change: '+23.1%', icon: <PeopleIcon />, color: '#2196F3' },
        { title: 'Total Orders', value: '3,129', change: '+5.4%', icon: <ShoppingCartIcon />, color: '#FF9800' },
        { title: 'Conversion Rate', value: '3.24%', change: '-2.1%', icon: <AssessmentIcon />, color: '#f44336' },
    ];

    const displayStats = stats.length > 0 ? stats : defaultStats;

    return (
        <Grid container spacing={3}>
            {displayStats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <StyledCard elevation={1}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Box sx={{
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: alpha(stat.color, 0.1),
                                color: stat.color,
                                display: 'inline-flex'
                            }}>
                                {stat.icon}
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {stat.change.startsWith('+') ?
                                    <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 16 }} /> :
                                    <TrendingDownIcon sx={{ color: '#f44336', fontSize: 16 }} />
                                }
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: stat.change.startsWith('+') ? '#4CAF50' : '#f44336',
                                        fontWeight: 600
                                    }}
                                >
                                    {stat.change}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {stat.title}
                        </Typography>
                    </StyledCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default StatsCards;