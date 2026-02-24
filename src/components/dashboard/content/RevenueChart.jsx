import { Box, Paper, Typography } from "@common";
import { useState } from "@react";

const RevenueChart = ({ data = [] }) => {
    const [period, setPeriod] = useState('Week');

    const periods = ['Day', 'Week', 'Month'];

    return (
        <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }} elevation={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>Revenue Overview</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {periods.map((p) => (
                        <Paper
                            key={p}
                            onClick={() => setPeriod(p)}
                            sx={{
                                px: 2,
                                py: 1,
                                bgcolor: p === period ? 'primary.main' : 'transparent',
                                color: p === period ? 'white' : 'text.secondary',
                                borderRadius: 2,
                                cursor: 'pointer',
                                '&:hover': {
                                    bgcolor: p === period ? 'primary.main' : 'action.hover',
                                }
                            }}
                        >
                            <Typography variant="caption">{p}</Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">Chart component would go here</Typography>
                {/* Add your preferred chart library here */}
            </Box>
        </Paper>
    );
};

export default RevenueChart;