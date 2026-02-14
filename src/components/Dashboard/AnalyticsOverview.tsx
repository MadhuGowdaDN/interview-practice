import { Grid2, Paper, Typography } from '@mui/material';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar, CartesianGrid } from 'recharts';
import { MetricCard } from '@common/MetricCard';
import type { DashboardAnalytics } from '@types/index';

export const AnalyticsOverview = ({ analytics }: { analytics: DashboardAnalytics }) => (
  <Grid2 container spacing={2}>
    <Grid2 size={{ xs: 12, md: 3 }}><MetricCard label="Total Exams" value={analytics.totalExams} /></Grid2>
    <Grid2 size={{ xs: 12, md: 3 }}><MetricCard label="Average Score" value={`${analytics.averageScore}%`} /></Grid2>
    <Grid2 size={{ xs: 12, md: 3 }}><MetricCard label="Best Skill" value={analytics.bestSkill} /></Grid2>
    <Grid2 size={{ xs: 12, md: 3 }}><MetricCard label="Weak Skill" value={analytics.weakSkill} /></Grid2>

    <Grid2 size={{ xs: 12, lg: 6 }}>
      <Paper sx={{ p: 2, height: 320 }}>
        <Typography variant="h6" mb={2}>Progress Over Time</Typography>
        <ResponsiveContainer width="100%" height="88%">
          <LineChart data={analytics.progressTimeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Grid2>

    <Grid2 size={{ xs: 12, lg: 6 }}>
      <Paper sx={{ p: 2, height: 320 }}>
        <Typography variant="h6" mb={2}>Skill-wise Accuracy</Typography>
        <ResponsiveContainer width="100%" height="88%">
          <BarChart data={analytics.skillAccuracy}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="accuracy" fill="#14b8a6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Grid2>
  </Grid2>
);
