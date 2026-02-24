// components/PasswordField.jsx
import {
    Box,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@common';
import { Visibility, VisibilityOff } from '@icon';
import { useTheme } from "@common";
import { useState } from "@react";

const PasswordField = ({ value, onChange, error, disabled, showForgotPassword = true }) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box>
            <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error}
                sx={{ mb: showForgotPassword ? 1 : 2 }}
                variant="outlined"
                disabled={disabled}
                InputProps={{
                    sx: { borderRadius: 2 },
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                                disabled={disabled}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            {showForgotPassword && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mb: 3,
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: theme.palette.primary.main,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        Forgot Password?
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default PasswordField;