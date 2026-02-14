import { Button, Card, CardContent, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const questionTypeOptions = ['MCQ', 'Coding', 'Short Answer', 'Scenario Based'];

const CreateExamPage = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.post('/skills/seed').then(() => api.get('/skills')).then(({ data }) => setSkills(data.map((s: any) => s.name)));
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb={2}>Create AI Exam</Typography>
        <Formik
          initialValues={{ skills: [] as string[], difficulty: 'Medium', questionTypes: ['MCQ'], questionCount: 5, durationInMinutes: 30 }}
          validationSchema={Yup.object({
            skills: Yup.array().min(1).required(),
            difficulty: Yup.string().required(),
            questionTypes: Yup.array().min(1).required(),
            questionCount: Yup.number().min(3).max(20).required(),
            durationInMinutes: Yup.number().min(5).max(180).required()
          })}
          onSubmit={async (values) => {
            const { data } = await api.post('/exams/generate', values);
            navigate(`/take-exam/${data._id}`);
          }}
        >
          {({ handleSubmit, values, getFieldProps, setFieldValue }) => (
            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              <FormControl>
                <InputLabel>Skills</InputLabel>
                <Select multiple value={values.skills} input={<OutlinedInput label="Skills" />} onChange={(e) => setFieldValue('skills', e.target.value)} renderValue={(selected) => <Stack direction="row" gap={1}>{(selected as string[]).map((value) => <Chip key={value} label={value} />)}</Stack>}>
                  {skills.map((skill) => <MenuItem key={skill} value={skill}>{skill}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField select label="Difficulty" {...getFieldProps('difficulty')}>
                {['Easy', 'Medium', 'Hard'].map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
              <FormControl>
                <InputLabel>Question Types</InputLabel>
                <Select multiple value={values.questionTypes} input={<OutlinedInput label="Question Types" />} onChange={(e) => setFieldValue('questionTypes', e.target.value)}>
                  {questionTypeOptions.map((type) => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField type="number" label="Question Count" {...getFieldProps('questionCount')} />
              <TextField type="number" label="Duration (minutes)" {...getFieldProps('durationInMinutes')} />
              <Button type="submit" variant="contained">Generate Exam</Button>
            </Stack>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default CreateExamPage;
