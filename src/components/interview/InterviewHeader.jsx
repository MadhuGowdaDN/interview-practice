import { ArrowBack as ArrowBackIcon, Info as InfoIcon } from "@icon";
import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography, useTheme } from "@common";

const InterviewHeader = ({ assessment, onBack }) => {
    const theme = useTheme();

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Toolbar>
                <IconButton edge="start" onClick={onBack} sx={{ mr: 2 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {assessment?.title || 'Interview Session'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {assessment?.description}
                    </Typography>
                </Box>
                <Tooltip title="Assessment Info">
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default InterviewHeader;