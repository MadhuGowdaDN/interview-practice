import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthStore } from '@features/authSlice';
import { useState } from 'react';

const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [error, setError] = useState('');

  return (
    <Paper sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 10 }}>
      <Typography variant="h4" mb={2} fontWeight={700}>Sign in</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values) => {
          try {
            setError('');
            await login(values);
            navigate('/');
          } catch {
            setError('Invalid credentials');
          }
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <Stack spacing={2}>
              <TextField name="email" label="Email" value={values.email} onChange={handleChange} error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
              <TextField name="password" label="Password" type="password" value={values.password} onChange={handleChange} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} />
              <Button type="submit" variant="contained" size="large">Login</Button>
              <Box>New user? <RouterLink to="/register">Create account</RouterLink></Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
