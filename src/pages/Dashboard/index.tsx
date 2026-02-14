import { Box, Button, Card, CardContent, Grid2, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import MetricCard from '../../components/MetricCard';

const DashboardPage = () => {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    api.get('/reports/analytics').then(({ data }) => setAnalytics(data));
  }, []);

  if (!analytics) return <Typography>Loading dashboard...</Typography>;

  return (
    <Stack spacing={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight={800}>Dashboard</Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/create-exam" variant="contained">New Exam</Button>
          <Button component={Link} to="/reports" variant="outlined">Reports</Button>
        </Stack>
      </Box>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}><MetricCard label="Total Exams" value={analytics.totalExams} /></Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}><MetricCard label="Average Score" value={`${analytics.averageScore}%`} /></Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}><MetricCard label="Best Skill" value={analytics.bestSkill} /></Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}><MetricCard label="Weak Skill" value={analytics.weakSkill} /></Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card><CardContent>
            <Typography variant="h6" mb={1}>Progress Over Time</Typography>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={analytics.progress}>
                <XAxis dataKey="date" /><YAxis /><Tooltip />
                <Line dataKey="score" stroke="#1976d2" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent></Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Card><CardContent>
            <Typography variant="h6" mb={1}>Skill-wise Accuracy</Typography>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={analytics.skillPerformance}>
                <XAxis dataKey="skill" /><YAxis /><Tooltip />
                <Bar dataKey="accuracy" fill="#7c4dff" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent></Card>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

export default DashboardPage;
