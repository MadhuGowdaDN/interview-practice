// components/RegisterForm.jsx
import {
    Alert,
    Avatar,
    Box,
    Button,
    Divider,
    Grid,
    Paper,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from '@common';
import { createUser } from '@features';
import {
    PersonAdd as PersonAddIcon
} from '@icon';
import { styled } from "@common";
import { useState } from "@react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "@react";
import PasswordField from './PasswordField';
import RegisterFooter from './RegisterFooter';
import SocialLoginButtons from './SocialLoginButtons';

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

const steps = ['Account Details', 'Personal Info', 'Preferences'];

const RegisterForm = ({ onRegister, externalError, setExternalError, onToggleView }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        // Account Details
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        // Personal Info
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        // Preferences
        experienceLevel: 'beginner',
        preferredRoles: [],
        companySize: '',
        newsletter: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'newsletter' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (externalError) setExternalError('');
    };

    const validateStep = () => {
        const newErrors = {};

        if (activeStep === 0) {
            if (!formData.userName) {
                newErrors.userName = 'User Name is required';
            } else if (formData.userName.length < 3) {
                newErrors.userName = 'User Name must be at least 3 characters';
            }

            if (!formData.email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid';
            }

            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            } else if (!/(?=.*[0-9])(?=.*[!@#$%^&*])/.test(formData.password)) {
                newErrors.password = 'Password must contain at least one number and one special character';
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        if (activeStep === 1) {
            if (!formData.firstName) {
                newErrors.firstName = 'First name is required';
            }
            if (!formData.lastName) {
                newErrors.lastName = 'Last name is required';
            }
            if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) {
                newErrors.phoneNumber = 'Phone number must be 10 digits';
            }
        }

        return newErrors;
    };

    const handleNext = () => {
        const stepErrors = validateStep();
        if (Object.keys(stepErrors).length === 0) {
            setActiveStep((prev) => prev + 1);
        } else {
            setErrors(stepErrors);
        }
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (activeStep === steps.length - 1) {
            setIsLoading(true);
            try {
                // await onRegister(formData);
                // // Handle successful registration
                // console.log('Registration successful!');
                // // Auto switch to login view
                // onToggleView();
                dispatch(createUser({
                    userName: formData?.userName,
                    password: formData?.password,
                    email: formData?.email,
                })).then(res => {
                    if (!res?.payload?.error) {
                        navigate("/dashboard");
                    }
                })
            } catch (error) {
                setExternalError(error.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            handleNext();
        }
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <TextField
                            fullWidth
                            label="User Name"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            error={!!errors.userName}
                            helperText={errors.userName}
                            sx={{ mb: 2 }}
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                            disabled={isLoading}
                        />

                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{ mb: 2 }}
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                            disabled={isLoading}
                        />

                        <PasswordField
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            disabled={isLoading}
                            showForgotPassword={false}
                        />

                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            sx={{ mb: 1 }}
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                            disabled={isLoading}
                        />
                    </Box>
                );

            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 2 } }}
                                disabled={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                error={!!errors.lastName}
                                helperText={errors.lastName}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 2 } }}
                                disabled={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber || 'Optional'}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 2 } }}
                                disabled={isLoading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                name="dateOfBirth"
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                variant="outlined"
                                InputProps={{ sx: { borderRadius: 2 } }}
                                disabled={isLoading}
                            />
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Box>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Experience Level
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                            {['beginner', 'intermediate', 'advanced'].map((level) => (
                                <Button
                                    key={level}
                                    variant={formData.experienceLevel === level ? 'contained' : 'outlined'}
                                    onClick={() => handleChange({ target: { name: 'experienceLevel', value: level } })}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {level}
                                </Button>
                            ))}
                        </Box>

                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                            Preferred Roles (Select all that apply)
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                            {['Frontend', 'Backend', 'Full Stack', 'DevOps', 'Data Science', 'Mobile'].map((role) => (
                                <Button
                                    key={role}
                                    variant={formData.preferredRoles.includes(role.toLowerCase()) ? 'contained' : 'outlined'}
                                    onClick={() => {
                                        const roles = formData.preferredRoles.includes(role.toLowerCase())
                                            ? formData.preferredRoles.filter(r => r !== role.toLowerCase())
                                            : [...formData.preferredRoles, role.toLowerCase()];
                                        handleChange({ target: { name: 'preferredRoles', value: roles } });
                                    }}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: 'none',
                                    }}
                                >
                                    {role}
                                </Button>
                            ))}
                        </Box>

                        <TextField
                            fullWidth
                            label="Target Company/Organization Size"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            placeholder="e.g., Startup, Mid-size, Enterprise"
                            variant="outlined"
                            InputProps={{ sx: { borderRadius: 2 } }}
                            disabled={isLoading}
                            sx={{ mb: 2 }}
                        />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <input
                                type="checkbox"
                                name="newsletter"
                                checked={formData.newsletter}
                                onChange={handleChange}
                                style={{ width: 18, height: 18 }}
                            />
                            <Typography variant="body2">
                                Send me interview tips and updates
                            </Typography>
                        </Box>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 550, mx: 'auto' }}>
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
                        <PersonAddIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                        Create Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Join thousands of successful candidates
                    </Typography>
                </Box>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {externalError && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {externalError}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    {renderStepContent(activeStep)}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            onClick={handleBack}
                            disabled={activeStep === 0 || isLoading}
                            sx={{ borderRadius: 2 }}
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{
                                py: 1,
                                px: 4,
                                borderRadius: 2,
                                textTransform: 'none',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #667eea 20%, #764ba2 120%)',
                                },
                            }}
                        >
                            {activeStep === steps.length - 1
                                ? (isLoading ? 'Creating Account...' : 'Create Account')
                                : 'Next'}
                        </Button>
                    </Box>

                    {activeStep === 0 && (
                        <>
                            <Divider sx={{ my: 3 }}>OR</Divider>
                            <SocialLoginButtons disabled={isLoading} />
                        </>
                    )}
                </form>

                <RegisterFooter onToggleView={onToggleView} />
            </StyledPaper>
        </Box>
    );
};

export default RegisterForm;