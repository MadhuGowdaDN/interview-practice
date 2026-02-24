import { Visibility, VisibilityOff } from "@icon";
import { IconButton, InputAdornment, TextField } from "@common";
import { useState } from "@react";

const CommonTextField = ({
    name,
    label,
    type = 'text',
    value,
    onChange,
    error = false,
    helperText = '',
    disabled = false,
    showForgotPassword = false,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Determine if this is a password field
    const isPassword = type === 'password';

    // Get the actual input type
    const inputType = isPassword
        ? (showPassword ? 'text' : 'password')
        : type;

    return (
        <TextField
            fullWidth
            label={label}
            name={name}
            type={inputType}
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={helperText}
            sx={{
                mb: showForgotPassword && isPassword ? 1 : 2,
                ...props.sx
            }}
            variant="outlined"
            disabled={disabled}
            InputProps={{
                sx: { borderRadius: 2 },
                endAdornment: isPassword ? (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            disabled={disabled}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ) : props.InputProps?.endAdornment,
                ...props.InputProps
            }}
            {...props}
        />
    );
};

export default CommonTextField;