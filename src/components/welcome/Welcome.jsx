// pages/Welcome.tsx
import {
    alpha,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Paper,
    Typography,
    useTheme
} from '@common';
import {
    Dashboard as DashboardIcon,
    People,
    RocketLaunch,
    Security,
    Speed,
    TrendingUp
} from '@icon';
import { useNavigate } from "@react";

const Welcome = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/dashboard");
    }
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* Hero Section */}
            <Box sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: 'white',
                pt: 8,
                pb: 12,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                                Welcome to AdminHub
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                The complete dashboard solution for your business needs.
                                Manage users, track analytics, and grow your platform.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        bgcolor: 'white',
                                        color: theme.palette.primary.main,
                                        '&:hover': { bgcolor: 'grey.100' }
                                    }}
                                    startIcon={<DashboardIcon />}
                                >
                                    Go to Dashboard
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        borderColor: 'white',
                                        color: 'white',
                                        '&:hover': { borderColor: 'white', bgcolor: alpha('#fff', 0.1) }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Paper
                                    elevation={24}
                                    sx={{
                                        p: 4,
                                        borderRadius: 4,
                                        bgcolor: alpha('#fff', 0.1),
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid',
                                        borderColor: alpha('#fff', 0.2)
                                    }}
                                >
                                    <RocketLaunch sx={{ fontSize: 120, color: 'white' }} />
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8, mt: -6, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={3}>
                    {[
                        { icon: <People />, title: 'User Management', desc: 'Manage all your users in one place' },
                        { icon: <TrendingUp />, title: 'Analytics', desc: 'Track your growth with detailed reports' },
                        { icon: <Security />, title: 'Security', desc: 'Enterprise-grade security features' },
                        { icon: <Speed />, title: 'Performance', desc: 'Lightning fast dashboard experience' },
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{
                                height: '100%',
                                borderRadius: 3,
                                transition: 'transform 0.3s',
                                '&:hover': { transform: 'translateY(-8px)' }
                            }}>
                                <CardContent>
                                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mb: 2 }}>
                                        {feature.icon}
                                    </Avatar>
                                    <Typography variant="h6" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.desc}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: 'white', py: 8 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
                        Ready to get started?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.2rem' }}>
                        Join thousands of businesses using AdminHub to manage their operations
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                        }}
                        onClick={handleNavigate}
                    >
                        Get Started Now
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Welcome;