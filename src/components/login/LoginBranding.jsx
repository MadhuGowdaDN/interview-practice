// components/LoginBranding.jsx
import { Avatar, Box, Chip, Stack, Typography } from '@common';
import {
    Code as CodeIcon,
    MenuBook as MenuBookIcon,
    Quiz as QuizIcon,
    School as SchoolIcon,
} from '@icon';
import { styled } from "@common";

const FeatureIcon = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    width: 40,
    height: 40,
    '& svg': {
        fontSize: 24,
    },
}));

const FeatureItem = ({ icon: Icon, title, description }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FeatureIcon>
            <Icon />
        </FeatureIcon>
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {description}
            </Typography>
        </Box>
    </Box>
);

const LoginBranding = () => {
    const features = [
        {
            icon: QuizIcon,
            title: '1000+ Interview Questions',
            description: 'Curated questions from top tech companies'
        },
        {
            icon: CodeIcon,
            title: 'Coding Challenges',
            description: 'Practice with real-time coding problems'
        },
        {
            icon: MenuBookIcon,
            title: 'Study Resources',
            description: 'Comprehensive guides and cheat sheets'
        }
    ];

    return (
        <Box sx={{ color: 'white', display: { xs: 'none', md: 'block' } }}>
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 800,
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                }}
            >
                Interview-Practice
            </Typography>
            <Typography
                variant="h5"
                sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 300,
                }}
            >
                Your Ultimate Interview Preparation Platform
            </Typography>

            <Stack spacing={3} sx={{ mt: 6 }}>
                {features.map((feature, index) => (
                    <FeatureItem key={index} {...feature} />
                ))}
            </Stack>

            <Box sx={{ mt: 6 }}>
                <Chip
                    icon={<SchoolIcon />}
                    label="Trusted by 10,000+ students"
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        '& .MuiChip-icon': { color: 'white' },
                        mr: 1,
                        mb: 1,
                    }}
                />
                <Chip
                    label="AICTE Approved"
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: 'white',
                        mb: 1,
                    }}
                />
            </Box>
        </Box>
    );
};

export default LoginBranding;