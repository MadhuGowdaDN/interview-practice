import { Box, LinearProgress, Typography } from "@common";

const ProgressBar = ({ current, total }) => {
    const progress = (current / total) * 100;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    Question {current} of {total}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {Math.round(progress)}% Complete
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(0,0,0,0.08)',
                    '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                    }
                }}
            />
        </Box>
    );
};

export default ProgressBar;