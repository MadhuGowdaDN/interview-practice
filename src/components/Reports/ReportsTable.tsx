import { Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { ExamResult } from '@types/index';

export const ReportsTable = ({ reports }: { reports: ExamResult[] }) => {
  const navigate = useNavigate();
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Detailed Reports (PDF-ready)</Typography>
        <Button variant="outlined" onClick={() => window.print()}>Download PDF</Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Score</TableCell>
            <TableCell>Weak Areas</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((report) => (
            <TableRow key={report._id} hover>
              <TableCell>{new Date(report.submittedAt).toLocaleDateString()}</TableCell>
              <TableCell>{report.totalScore}/{report.maxScore}</TableCell>
              <TableCell>{report.weakAreas.join(', ')}</TableCell>
              <TableCell align="right"><Button onClick={() => navigate(`/result/${report._id}`)}>View Result</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
