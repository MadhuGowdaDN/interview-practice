// components/RegisterFooter.jsx
import { Box, Typography } from '@common';
import { useTheme } from "@common";

const RegisterFooter = ({ onToggleView }) => {
    const theme = useTheme();

    return (
        <Box>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Typography
                        component="span"
                        onClick={onToggleView}
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        Sign in here
                    </Typography>
                </Typography>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    By creating an account, you agree to our Terms and Privacy Policy
                </Typography>
            </Box>
        </Box>
    );
};

export default RegisterFooter;