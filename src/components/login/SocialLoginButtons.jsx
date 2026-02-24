// components/SocialLoginButtons.jsx
import { Box, Button } from '@common';
import { GitHub as GitHubIcon, Google as GoogleIcon } from '@icon';

const SocialLoginButtons = ({ disabled }) => {
    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        // Implement social login logic here
    };

    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('Google')}
                disabled={disabled}
                sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    borderColor: '#ddd',
                    color: '#555',
                    '&:hover': {
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    },
                }}
            >
                Google
            </Button>
            <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                onClick={() => handleSocialLogin('GitHub')}
                disabled={disabled}
                sx={{
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    borderColor: '#ddd',
                    color: '#555',
                    '&:hover': {
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.04)',
                    },
                }}
            >
                GitHub
            </Button>
        </Box>
    );
};

export default SocialLoginButtons;