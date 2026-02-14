import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const ReportsPage = () => {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    api.get('/reports').then(({ data }) => setReports(data));
  }, []);

  return (
    <Stack spacing={2}>
      <Typography variant="h4" fontWeight={800}>Detailed Reports</Typography>
      {reports.map((report) => (
        <Card key={report._id}>
          <CardContent>
            <Typography variant="h6">Exam {report.exam?._id?.slice(-6)}</Typography>
            <Typography variant="body2" color="text.secondary">PDF-ready structure for export with scorecards, explanations, and suggestions.</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography><strong>Feedback:</strong> {report.personalizedFeedback}</Typography>
            <Typography><strong>Weak Areas:</strong> {(report.weakAreas || []).join(', ')}</Typography>
            <Typography><strong>Practice Plan:</strong> {(report.practicePlan || []).join(' | ')}</Typography>
            <Button variant="outlined" sx={{ mt: 1 }}>Download PDF (hook ready)</Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ReportsPage;
