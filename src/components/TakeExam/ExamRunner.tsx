import { Alert, Box, Button, Chip, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { examApi } from '@services/api';
import { useExamStore } from '@features/examSlice';
import { useCountdown } from '@hooks/useCountdown';

export const ExamRunner = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const { currentExam, fetchExam, answers, saveAnswer } = useExamStore();
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [markedForReview, setMarkedForReview] = useState(false);

  const submitExam = useCallback(async () => {
    const result = await examApi.submitExam(id);
    navigate(`/result/${result._id}`);
  }, [id, navigate]);

  useEffect(() => { fetchExam(id); }, [fetchExam, id]);

  const totalSeconds = (currentExam?.durationInMinutes || 30) * 60;
  const { secondsLeft } = useCountdown(totalSeconds, submitExam);

  useEffect(() => {
    const question = currentExam?.questions[index];
    if (!question) return;
    const saved = answers[question._id];
    setInput(saved?.answer || '');
    setMarkedForReview(saved?.markedForReview || false);
  }, [index, currentExam, answers]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const question = currentExam?.questions[index];
  const progress = useMemo(() => ((index + 1) / (currentExam?.questions.length || 1)) * 100, [index, currentExam]);

  if (!currentExam || !question) return <Alert severity="info">Loading exam...</Alert>;

  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Question {index + 1} / {currentExam.questions.length}</Typography>
        <Chip label={`Time left: ${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}`} color="secondary" />
      </Stack>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 2, height: 8, borderRadius: 4 }} />

      <Typography fontWeight={700} mb={1}>{question.prompt}</Typography>
      {question.options?.length ? (
        <Stack spacing={1} mb={2}>
          {question.options.map((option) => (
            <Button key={option} variant={input === option ? 'contained' : 'outlined'} onClick={() => setInput(option)}>{option}</Button>
          ))}
        </Stack>
      ) : (
        <TextField multiline minRows={4} value={input} onChange={(e) => setInput(e.target.value)} fullWidth label="Your answer" sx={{ my: 2 }} />
      )}

      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          onClick={async () => {
            await saveAnswer(id, { questionId: question._id, answer: input, markedForReview: !markedForReview });
            setMarkedForReview((prev) => !prev);
          }}
        >
          {markedForReview ? 'Unmark Review' : 'Mark for Review'}
        </Button>
        <Button variant="contained" onClick={async () => {
          await saveAnswer(id, { questionId: question._id, answer: input, markedForReview });
          if (index < currentExam.questions.length - 1) setIndex((prev) => prev + 1);
        }}>Save & Next</Button>
        <Box flexGrow={1} />
        <Button color="success" variant="contained" onClick={submitExam}>Submit Exam</Button>
      </Stack>
    </Paper>
  );
};
