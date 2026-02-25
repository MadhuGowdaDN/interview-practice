import { Paper, styled } from "@mui/material";

/**
 * CommonCard
 * Standardizes the premium glassmorphism/gradient card layout
 * used across the application.
 */
const StyledCard = styled(Paper)(({ theme, glassmorphism, noPadding, premiumGradient }) => ({
    padding: noPadding ? 0 : theme.spacing(4),
    borderRadius: theme.spacing(2),
    background: premiumGradient
        ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)'
        : theme.palette.background.paper,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: glassmorphism ? 'blur(10px)' : 'none',
    border: glassmorphism ? '1px solid rgba(255,255,255,0.2)' : 'none',
    [theme.breakpoints.down('sm')]: {
        padding: noPadding ? 0 : theme.spacing(3),
    },
}));

const CommonCard = ({
    children,
    elevation = 3,
    glassmorphism = true,
    premiumGradient = true,
    noPadding = false,
    sx = {},
    ...props
}) => {
    return (
        <StyledCard
            elevation={elevation}
            glassmorphism={glassmorphism ? 1 : 0}
            premiumGradient={premiumGradient ? 1 : 0}
            noPadding={noPadding ? 1 : 0}
            sx={sx}
            {...props}
        >
            {children}
        </StyledCard>
    );
};

export default CommonCard;
