// components/LoginForm.jsx (updated)
import {
    Alert,
    Avatar,
    Box,
    CommonButton,
    CommonCard, CommonHeading, CommonText,
    CommonTextField, Divider
} from '@common';
import { loginUser } from '@features';
import { School as SchoolIcon } from '@icon';
import { useNavigate } from "@react";
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import LoginFooter from './LoginFooter';
import SocialLoginButtons from './SocialLoginButtons';
// ==========================================================================================================
const validationSchema = Yup.object({
    email: Yup.string().required("User Name or Email is required").nullable(),
    password: Yup.string().required("Password is required").nullable()
        .min(6, "Password must be at least 6 characters"),
})
// ==========================================================================================================
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
            <CommonCard>
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
                    <CommonHeading variant="h4" sx={{ mb: 1 }}>
                        Welcome Back!
                    </CommonHeading>
                    <CommonText variant="body2" muted={true}>
                        Sign in to continue your interview preparation
                    </CommonText>
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

                    <CommonButton
                        type="submit"
                        fullWidth
                        size="large"
                        isLoading={isLoading}
                        sx={{
                            py: 1.5,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1.1rem',
                        }}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </CommonButton>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    <SocialLoginButtons disabled={isLoading} />
                    <LoginFooter onToggleView={onToggleView} />
                </form>
            </CommonCard>
        </Box>
    );
};

export default LoginForm;