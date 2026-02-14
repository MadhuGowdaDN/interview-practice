import { Alert, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ReportsTable } from '@components/Reports/ReportsTable';
import { useReportStore } from '@features/reportSlice';

const ReportsPage = () => {
  const { reports, fetchReports } = useReportStore();
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports().catch(() => setError('Could not load reports'));
  }, [fetchReports]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!reports.length) return <Skeleton variant="rounded" height={240} />;

  return (
    <>
      <Typography variant="h4" fontWeight={700} mb={2}>Reports & Download Center</Typography>
      <ReportsTable reports={reports} />
    </>
  );
};

export default ReportsPage;
