import { Typography } from "@mui/material";

/**
 * CommonText
 * Standardizes body and subheading text, applying standard opacities and weights.
 */
const CommonText = ({
    variant = 'body1', // 'body1' | 'body2' | 'subtitle1' | 'subtitle2' | 'caption'
    component,
    color = 'text.primary', // optionally default to textSecondary?
    muted = false,
    align = 'left',
    gutterBottom = false,
    sx = {},
    children,
    ...props
}) => {

    return (
        <Typography
            variant={variant}
            component={component || 'p'}
            align={align}
            color={muted ? 'text.secondary' : color}
            gutterBottom={gutterBottom}
            sx={{
                opacity: muted ? 0.9 : 1, // subtle standardization for muted text
                ...sx
            }}
            {...props}
        >
            {children}
        </Typography>
    );
};

export default CommonText;
