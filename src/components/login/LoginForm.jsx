// components/LoginForm.jsx (updated)
import {
    Alert,
    Avatar,
    Box,
    Button, CommonTextField, Divider,
    Paper,
    Typography
} from '@common';
import { loginUser } from '@features';
import { School as SchoolIcon } from '@icon';
import { styled } from "@common";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "@react";
import * as Yup from "yup";
import LoginFooter from './LoginFooter';
import SocialLoginButtons from './SocialLoginButtons';
// ==========================================================================================================
const validationSchema = Yup.object({
    email: Yup.string().required("User Name or Email is required").nullable(),
    password: Yup.string().required("Password is required").nullable()
        .min(6, "Password must be at least 6 characters"),
})
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
    },
}));
// ==========================================================================================================

const LoginForm = ({ externalError, setExternalError, onToggleView }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state?.user?.loading);
    const user = useSelector(state => state?.user);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const result = await dispatch(loginUser({
                userName: values?.email,
                password: values?.password,
            })).then(res => {
                if (res?.payload?.ok) {
                    navigate("/dashboard")
                    return true;
                }
                return false;
            })
            return result;
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await formik.submitForm();
        return result;
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 450, mx: 'auto' }}>
            <StyledPaper elevation={3}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Avatar
                        sx={{
                            mx: 'auto',
                            mb: 2,
                            width: 80,
                            height: 80,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                    >
                        <SchoolIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Welcome Back!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sign in to continue your interview preparation
                    </Typography>
                </Box>

                {externalError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {externalError}
                    </Alert>
                )}

                <form noValidate>
                    <CommonTextField
                        name="email"
                        id="email"
                        fullWidth
                        label="User Name / Email Address"
                        type="string"
                        onChange={formik.handleChange}
                        error={formik.touched?.email && formik.errors?.email}
                        helperText={formik.touched?.email && formik.errors?.email}
                        disabled={isLoading}
                        required={true}
                        value={formik.values.email}
                        InputProps={{
                            sx: { borderRadius: 2 },
                        }}
                    />
                    <CommonTextField
                        name="password"
                        id="password"
                        fullWidth
                        label="Password"
                        type="password"
                        onChange={formik.handleChange}
                        error={formik.touched?.password && formik.errors?.password}
                        helperText={formik.touched?.password && formik.errors?.password}
                        disabled={isLoading}
                        required={true}
                        value={formik.values.password}
                        showForgotPassword={true}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isLoading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #667eea 20%, #764ba2 120%)',
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    <SocialLoginButtons disabled={isLoading} />
                    <LoginFooter onToggleView={onToggleView} />
                </form>
            </StyledPaper>
        </Box>
    );
};

export default LoginForm;