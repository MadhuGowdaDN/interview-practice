import { Box, Grid, Paper, Typography } from "@common";
import { useTheme } from "@common";

const WelcomeSection = ({ user = { name: 'John' }, stats = {} }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                mb: 4,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: 'white'
            }}
        >
            <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                        Welcome back, {user.name}! 👋
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9, mb: 3 }}>
                        Here's what's happening with your dashboard today. You have {stats.newUsers || 12} new users and {stats.newOrders || 24} orders to process.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Paper sx={{ px: 3, py: 1.5, bgcolor: 'white', color: 'text.primary' }}>
                            <Typography variant="caption">Last Login</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>Today, 9:30 AM</Typography>
                        </Paper>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src="https://via.placeholder.com/200x200"
                        sx={{ width: 200, height: 200, borderRadius: 4 }}
                        alt="Dashboard illustration"
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default WelcomeSection;