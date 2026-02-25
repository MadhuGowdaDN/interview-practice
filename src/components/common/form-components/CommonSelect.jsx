import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";

const CommonSelect = ({
    name,
    label,
    value,
    onChange,
    options = [], // Expected format: [{ value: '1', label: 'One' }]
    error = false,
    helperText = '',
    disabled = false,
    required = false,
    fullWidth = true,
    children,
    sx = {},
    ...props
}) => {
    return (
        <FormControl
            fullWidth={fullWidth}
            error={!!error}
            disabled={disabled}
            required={required}
            size={props.size}
            sx={{ mb: 2, ...sx }}
        >
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                id={name}
                name={name}
                value={value || ''}
                label={label}
                onChange={onChange}
                sx={{ borderRadius: 2 }} // standard border radius matching CommonTextField
                {...props}
            >
                {children ? children : options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default CommonSelect;
