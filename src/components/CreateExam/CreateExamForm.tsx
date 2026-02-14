import { Alert, Button, Chip, Grid2, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { DIFFICULTY_LEVELS, QUESTION_TYPES } from '@constants/config';
import { useExamStore } from '@features/examSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object({
  skills: Yup.array().of(Yup.string()).min(1).required(),
  difficulty: Yup.string().required(),
  questionType: Yup.string().required(),
  questionCount: Yup.number().min(5).max(50).required()
});

export const CreateExamForm = () => {
  const navigate = useNavigate();
  const { fetchSkills, skills, generateExam } = useExamStore();
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills().catch(() => setError('Failed to load skills'));
  }, [fetchSkills]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>Create AI-Powered Exam</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Formik
        initialValues={{ skills: [] as string[], difficulty: 'Medium', questionType: 'MCQ', questionCount: 10 }}
        validationSchema={schema}
        onSubmit={async (values) => {
          const exam = await generateExam(values);
          navigate(`/take-exam/${exam._id}`);
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Stack spacing={2}>
              <TextField
                select
                SelectProps={{ multiple: true, renderValue: (selected) => (<Stack direction="row" spacing={1} flexWrap="wrap">{(selected as string[]).map((v) => <Chip key={v} label={skills.find((s) => s._id === v)?.name || v} />)}</Stack>) }}
                label="Skills"
                name="skills"
                value={values.skills}
                onChange={(event) => setFieldValue('skills', event.target.value)}
              >
                {skills.map((skill) => <MenuItem key={skill._id} value={skill._id}>{skill.name}</MenuItem>)}
              </TextField>
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, md: 4 }}><TextField select fullWidth label="Difficulty" name="difficulty" value={values.difficulty} onChange={handleChange}>{DIFFICULTY_LEVELS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}</TextField></Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}><TextField select fullWidth label="Question Type" name="questionType" value={values.questionType} onChange={handleChange}>{QUESTION_TYPES.map((qt) => <MenuItem key={qt.value} value={qt.value}>{qt.label}</MenuItem>)}</TextField></Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}><TextField fullWidth label="No. of Questions" name="questionCount" type="number" value={values.questionCount} onChange={handleChange} /></Grid2>
              </Grid2>
              <Button size="large" variant="contained" type="submit">Generate Exam with AI</Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
