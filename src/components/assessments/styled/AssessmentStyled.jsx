// styled/AssessmentStyled.jsx
import { alpha, Card, Paper, styled } from "@common";

export const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    overflow: 'visible',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[12],
        '& .assessment-actions': {
            opacity: 1,
            transform: 'translateY(0)'
        }
    }
}));

export const GlassCard = styled(Paper)(({ theme }) => ({
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(3),
}));