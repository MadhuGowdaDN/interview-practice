import { AccessTime as TimeIcon } from "@icon";
import { Box, Chip, CircularProgress, Typography, useTheme } from "@common";
import { useEffect, useState } from "@react";

const Timer = ({ initialMinutes, onTimeUp }) => {
    const theme = useTheme();
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isWarning, setIsWarning] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    useEffect(() => {
        if (timeLeft <= 300) { // 5 minutes warning
            setIsWarning(true);
        }
    }, [timeLeft]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / (initialMinutes * 60)) * 100;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={60}
                    thickness={4}
                    sx={{
                        color: isWarning ? theme.palette.warning.main : theme.palette.primary.main,
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        }
                    }}
                />
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TimeIcon sx={{ fontSize: 20, color: isWarning ? theme.palette.warning.main : theme.palette.primary.main }} />
                </Box>
            </Box>
            <Box>
                <Typography variant="h5" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    {formatTime()}
                </Typography>
                <Chip
                    label={isWarning ? 'Time running out!' : 'Time remaining'}
                    size="small"
                    color={isWarning ? 'warning' : 'default'}
                    sx={{ height: 20, fontSize: '0.7rem' }}
                />
            </Box>
        </Box>
    );
};

export default Timer;