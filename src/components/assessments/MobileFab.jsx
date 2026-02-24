// components/assessments/MobileFab.jsx
import { Add as AddIcon } from "@icon";
import { Fab } from "@common";
import { useTheme } from "@common";

const MobileFab = ({ onClick }) => {
    const theme = useTheme();

    return (
        <Fab
            color="primary"
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                display: { xs: 'flex', md: 'none' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
            }}
            onClick={onClick}
        >
            <AddIcon />
        </Fab>
    );
};

export default MobileFab;