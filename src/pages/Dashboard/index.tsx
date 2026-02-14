import { Alert, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AnalyticsOverview } from '@components/Dashboard/AnalyticsOverview';
import { useReportStore } from '@features/reportSlice';

const DashboardPage = () => {
  const [error, setError] = useState('');
  const { analytics, fetchAnalytics } = useReportStore();

  useEffect(() => {
    fetchAnalytics().catch(() => setError('Unable to fetch analytics'));
  }, [fetchAnalytics]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!analytics) return <Skeleton variant="rounded" height={300} />;

  return (
    <>
      <Typography variant="h4" fontWeight={700} mb={2}>Your Interview Performance Dashboard</Typography>
      <AnalyticsOverview analytics={analytics} />
    </>
  );
};

export default DashboardPage;
