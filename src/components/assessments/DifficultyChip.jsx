// components/assessments/DifficultyChip.jsx
import { Chip, alpha } from "@common";
import { styled } from "@common";

const StyledChip = styled(Chip)(({ theme, level }) => {
    const colors = {
        beginner: { bg: alpha('#4CAF50', 0.1), color: '#4CAF50' },
        intermediate: { bg: alpha('#FF9800', 0.1), color: '#FF9800' },
        advanced: { bg: alpha('#f44336', 0.1), color: '#f44336' },
        expert: { bg: alpha('#9C27B0', 0.1), color: '#9C27B0' },
    };

    return {
        backgroundColor: colors[level]?.bg || colors.beginner.bg,
        color: colors[level]?.color || colors.beginner.color,
        fontWeight: 600,
        '& .MuiChip-label': {
            px: 2,
            textTransform: 'capitalize'
        },
    };
});

const DifficultyChip = ({ level }) => {
    return <StyledChip level={level} label={level} size="small" />;
};

export default DifficultyChip;