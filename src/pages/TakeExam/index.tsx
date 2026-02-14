import { Alert, Box, Button, Card, CardContent, Chip, LinearProgress, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const TakeExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [review, setReview] = useState<Record<string, boolean>>({});
  const [idx, setIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    api.get(`/exams/${id}`).then(({ data }) => {
      setExam(data);
      setSecondsLeft((data.durationInMinutes || 30) * 60);
    });
  }, [id]);

  useEffect(() => {
    if (!secondsLeft) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  useEffect(() => {
    const block = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', block);
    return () => window.removeEventListener('beforeunload', block);
  }, []);

  const question = exam?.questions?.[idx];
  const progress = useMemo(() => (exam ? ((idx + 1) / exam.questions.length) * 100 : 0), [idx, exam]);

  const persistAnswer = async () => {
    if (!question) return;
    await api.patch(`/exams/${id}/answer`, {
      questionId: question._id,
      response: answers[question._id] || '',
      markedForReview: review[question._id] || false
    });
  };

  const submitExam = async () => {
    await persistAnswer();
    const { data } = await api.post(`/exams/${id}/submit`);
    navigate(`/result/${data.result._id}`);
  };

  if (!exam || !question) return <Typography>Loading exam...</Typography>;

  return (
    <Stack spacing={2}>
      <Alert severity="info">Timer: {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}</Alert>
      <LinearProgress variant="determinate" value={progress} />
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <Box display="flex" gap={1}><Chip label={question.skill} /><Chip label={question.difficulty} /><Chip label={question.questionType} /></Box>
            <Typography variant="h6">Q{idx + 1}. {question.questionText}</Typography>
            {question.questionType === 'MCQ' ? (
              <Stack spacing={1}>
                {question.options.map((opt: string) => (
                  <Button
                    key={opt}
                    variant={answers[question._id] === opt ? 'contained' : 'outlined'}
                    onClick={() => setAnswers((a) => ({ ...a, [question._id]: opt }))}
                  >
                    {opt}
                  </Button>
                ))}
              </Stack>
            ) : (
              <TextField
                multiline
                minRows={6}
                value={answers[question._id] || ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [question._id]: e.target.value }))}
                placeholder="Write your answer here"
              />
            )}

            <Stack direction="row" justifyContent="space-between">
              <Button onClick={async () => { await persistAnswer(); setIdx((i) => Math.max(i - 1, 0)); }}>Previous</Button>
              <Stack direction="row" spacing={1}>
                <Button onClick={() => setReview((r) => ({ ...r, [question._id]: !r[question._id] }))}>
                  {review[question._id] ? 'Unmark Review' : 'Mark for Review'}
                </Button>
                {idx < exam.questions.length - 1 ? (
                  <Button variant="contained" onClick={async () => { await persistAnswer(); setIdx((i) => i + 1); }}>
                    Save & Next
                  </Button>
                ) : (
                  <Button color="success" variant="contained" onClick={submitExam}>Submit Exam</Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TakeExamPage;
