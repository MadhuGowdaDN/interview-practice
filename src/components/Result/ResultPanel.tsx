import { Alert, Chip, Divider, Paper, Stack, Typography } from '@mui/material';
import type { ExamResult } from '@types/index';

export const ResultPanel = ({ result }: { result: ExamResult }) => (
  <Stack spacing={2}>
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700}>Score: {result.totalScore}/{result.maxScore}</Typography>
      <Typography color="text.secondary">Submitted on {new Date(result.submittedAt).toLocaleString()}</Typography>
      <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
        {result.weakAreas.map((w) => <Chip key={w} color="warning" label={`Weak Area: ${w}`} />)}
      </Stack>
      <Typography mt={2}>{result.personalizedFeedback}</Typography>
    </Paper>

    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={1}>AI Suggested Practice Plan</Typography>
      {result.practicePlan.map((plan) => <Alert key={plan} severity="info" sx={{ mb: 1 }}>{plan}</Alert>)}
    </Paper>

    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={1}>Question Breakdown</Typography>
      {result.details.map((item, idx) => (
        <Stack key={item.questionId} spacing={1} py={2}>
          <Typography fontWeight={600}>{idx + 1}. {item.prompt}</Typography>
          <Typography color={item.isCorrect ? 'success.main' : 'error.main'}>{item.isCorrect ? 'Correct' : 'Incorrect'} - Score {item.score}</Typography>
          <Typography variant="body2">Your answer: {item.userAnswer}</Typography>
          <Typography variant="body2">Explanation: {item.explanation}</Typography>
          <Typography variant="body2">Improve: {item.improvementFeedback}</Typography>
          <Divider />
        </Stack>
      ))}
    </Paper>
  </Stack>
);
