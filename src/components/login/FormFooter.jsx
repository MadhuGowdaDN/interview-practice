// components/FormFooter.jsx
import { Box, Typography } from '@common';
import { useTheme } from "@common";

const FormFooter = () => {
    const theme = useTheme();

    return (
        <Box>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Typography
                        component="span"
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 600,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        Sign up for free
                    </Typography>
                </Typography>
            </Box>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                    By signing in, you agree to our Terms and Privacy Policy
                </Typography>
            </Box>
        </Box>
    );
};

export default FormFooter;