import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 480, mx: 'auto', mt: 8 }}>
      <CardContent>
        <Typography variant="h5" mb={2}>Create account</Typography>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required()
          })}
          onSubmit={async (values) => {
            const { data } = await api.post('/auth/register', values);
            setAuth(data.token, data.user);
            toast.success('Account created');
            navigate('/dashboard');
          }}
        >
          {({ handleSubmit, getFieldProps, errors, touched }) => (
            <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              <TextField label="Name" {...getFieldProps('name')} error={Boolean(touched.name && errors.name)} helperText={touched.name && errors.name} />
              <TextField label="Email" {...getFieldProps('email')} error={Boolean(touched.email && errors.email)} helperText={touched.email && errors.email} />
              <TextField type="password" label="Password" {...getFieldProps('password')} error={Boolean(touched.password && errors.password)} helperText={touched.password && errors.password} />
              <Button type="submit" variant="contained">Register</Button>
              <Typography variant="body2">Already registered? <Link to="/login">Login</Link></Typography>
            </Stack>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
