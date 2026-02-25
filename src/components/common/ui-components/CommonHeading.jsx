import { Typography } from "@mui/material";

/**
 * CommonHeading
 * Standardizes sizes and font weights for primary page headings.
 */
const CommonHeading = ({
    variant = 'h4', // 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    component,
    color,
    align = 'left',
    gutterBottom = false,
    sx = {},
    children,
    ...props
}) => {

    const getDefaultWeight = (v) => {
        if (['h1', 'h2', 'h3'].includes(v)) return 800;
        if (['h4', 'h5', 'h6'].includes(v)) return 700;
        return 600; // fallback
    };

    return (
        <Typography
            variant={variant}
            component={component || variant}
            align={align}
            color={color}
            gutterBottom={gutterBottom}
            sx={{
                fontWeight: sx.fontWeight || getDefaultWeight(variant),
                letterSpacing: ['h1', 'h2'].includes(variant) ? '-0.5px' : 'normal',
                ...sx
            }}
            {...props}
        >
            {children}
        </Typography>
    );
};

export default CommonHeading;
