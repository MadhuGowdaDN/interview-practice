import { Alert, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { reportApi } from '@services/api';
import type { ExamResult } from '@types/index';
import { ResultPanel } from '@components/Result/ResultPanel';

const ResultPage = () => {
  const { id = '' } = useParams();
  const [result, setResult] = useState<ExamResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    reportApi.getReports().then((reports) => {
      const selected = reports.find((report) => report._id === id);
      if (!selected) throw new Error('Result not found');
      setResult(selected);
    }).catch(() => setError('Could not load result'));
  }, [id]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!result) return <Skeleton variant="rounded" height={300} />;

  return (
    <>
      <Typography variant="h4" fontWeight={700} mb={2}>Exam Result & AI Evaluation</Typography>
      <ResultPanel result={result} />
    </>
  );
};

export default ResultPage;
