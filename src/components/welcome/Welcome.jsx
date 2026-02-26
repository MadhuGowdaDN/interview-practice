// pages/Welcome.tsx
import {
    alpha,
    Avatar,
    Box,
    CommonButton,
    CommonCard,
    CommonHeading,
    CommonText,
    Container,
    Grid,
    PageHeader,
    Paper,
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
import { CircularProgress } from '@mui/material';
import { useNavigate } from "@react";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWelcomeData } from '../../features/welcomeSlice';

const iconMap = {
    People: <People />,
    TrendingUp: <TrendingUp />,
    Security: <Security />,
    Speed: <Speed />,
    RocketLaunch: <RocketLaunch />,
    DashboardIcon: <DashboardIcon />
};

const Welcome = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data, loading } = useSelector((state) => state.welcome);
    const welcomeData = data?.welcomeData;
    const isLoading = loading?.fetchWelcomeData;

    useEffect(() => {
        dispatch(fetchWelcomeData());
    }, [dispatch]);

    const handleNavigate = () => {
        navigate("/dashboard");
    }

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: '#f8fafc' }}>
                <CircularProgress />
            </Box>
        );
    }

    const hero = welcomeData?.hero || {
        title: "Welcome to AdminHub",
        subtitle: "The complete dashboard solution for your business needs. Manage users, track analytics, and grow your platform.",
        icon: "RocketLaunch"
    };

    const features = welcomeData?.features || [
        { icon: 'People', title: 'User Management', desc: 'Manage all your users in one place' },
        { icon: 'TrendingUp', title: 'Analytics', desc: 'Track your growth with detailed reports' },
        { icon: 'Security', title: 'Security', desc: 'Enterprise-grade security features' },
        { icon: 'Speed', title: 'Performance', desc: 'Lightning fast dashboard experience' },
    ];

    const cta = welcomeData?.cta || {
        title: "Ready to get started?",
        subtitle: "Join thousands of businesses using AdminHub to manage their operations"
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {/* Hero Section */}
            <PageHeader
                title={hero.title}
                subtitle={hero.subtitle}
                rightContent={
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
                        {iconMap[hero.icon] ? (
                            <Box sx={{ '& > svg': { fontSize: 120, color: 'white' } }}>
                                {iconMap[hero.icon]}
                            </Box>
                        ) : (
                            <RocketLaunch sx={{ fontSize: 120, color: 'white' }} />
                        )}
                    </Paper>
                }
            >
                <CommonButton
                    variant="contained"
                    size="large"
                    sx={{
                        bgcolor: 'white',
                        color: theme.palette.primary.main,
                        '&:hover': { bgcolor: 'grey.100' }
                    }}
                    startIcon={<DashboardIcon />}
                    onClick={handleNavigate}
                >
                    Go to Dashboard
                </CommonButton>
                <CommonButton
                    variant="outlined"
                    size="large"
                    sx={{
                        borderColor: 'white',
                        color: 'white',
                        '&:hover': { borderColor: 'white', bgcolor: alpha('#fff', 0.1) }
                    }}
                >
                    Learn More
                </CommonButton>
            </PageHeader>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 8, mt: -6, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={3}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <CommonCard
                                premiumGradient={false}
                                elevation={1}
                                sx={{
                                    height: '100%',
                                    transition: 'transform 0.3s',
                                    '&:hover': { transform: 'translateY(-8px)' }
                                }}
                            >
                                <Avatar sx={{ bgcolor: theme.palette.primary.main, mb: 2 }}>
                                    {iconMap[feature.icon] || <RocketLaunch />}
                                </Avatar>
                                <CommonHeading variant="h6" gutterBottom={true}>
                                    {feature.title}
                                </CommonHeading>
                                <CommonText variant="body2" muted={true}>
                                    {feature.desc}
                                </CommonText>
                            </CommonCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ bgcolor: 'white', py: 8 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <CommonHeading variant="h3" sx={{ mb: 3 }}>
                        {cta.title}
                    </CommonHeading>
                    <CommonText variant="body1" muted={true} sx={{ mb: 4, fontSize: '1.2rem' }}>
                        {cta.subtitle}
                    </CommonText>
                    <CommonButton
                        variant="contained"
                        size="large"
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: '1.2rem',
                        }}
                        onClick={handleNavigate}
                    >
                        Get Started Now
                    </CommonButton>
                </Container>
            </Box>
        </Box>
    );
};

export default Welcome;