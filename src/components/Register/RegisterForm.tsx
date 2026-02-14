import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthStore } from '@features/authSlice';
import { useState } from 'react';

const schema = Yup.object({
  name: Yup.string().min(2).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required()
});

export const RegisterForm = () => {
  const navigate = useNavigate();
  const register = useAuthStore((s) => s.register);
  const [error, setError] = useState('');

  return (
    <Paper sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 8 }}>
      <Typography variant="h4" mb={2} fontWeight={700}>Create account</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={async (values) => {
          try {
            setError('');
            await register(values);
            navigate('/');
          } catch {
            setError('Failed to register');
          }
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <Form>
            <Stack spacing={2}>
              <TextField name="name" label="Name" value={values.name} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
              <TextField name="email" label="Email" value={values.email} onChange={handleChange} error={!!touched.email && !!errors.email} helperText={touched.email && errors.email} />
              <TextField name="password" label="Password" type="password" value={values.password} onChange={handleChange} error={!!touched.password && !!errors.password} helperText={touched.password && errors.password} />
              <Button type="submit" variant="contained" size="large">Register</Button>
              <Box>Already have account? <RouterLink to="/login">Sign in</RouterLink></Box>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};
