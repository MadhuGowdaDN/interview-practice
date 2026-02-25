import { Button, CircularProgress } from "@mui/material";

const CommonButton = ({
    children,
    isLoading = false,
    variant = "contained",
    color = "primary",
    sx = {},
    disabled = false,
    startIcon,
    endIcon,
    ...props
}) => {
    // Add standard gradient for primary contained buttons if desired
    const isPrimaryContained = variant === "contained" && color === "primary";
    const gradientStyles = {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        "&:hover": {
            background: "linear-gradient(135deg, #667eea 20%, #764ba2 120%)",
        },
    };

    return (
        <Button
            variant={variant}
            color={color}
            disabled={disabled || isLoading}
            startIcon={!isLoading && startIcon}
            endIcon={!isLoading && endIcon}
            sx={{
                px: 3,
                ...(isPrimaryContained && gradientStyles),
                ...sx,
            }}
            {...props}
        >
            {isLoading ? (
                <CircularProgress
                    size={24}
                    color="inherit"
                    sx={{ mr: 1, my: -1 }} // Adjust margin to not mess up height
                />
            ) : null}
            {children}
        </Button>
    );
};

export default CommonButton;
