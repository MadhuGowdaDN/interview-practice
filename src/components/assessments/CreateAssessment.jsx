import {
    Alert,
    Container,
    Paper,
    Snackbar,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@common";
import { useState } from "@react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "@react";

import BasicInfoStep from './steps/BasicInfoStep';
import QuestionsStep from './steps/QuestionsStep';
import ReviewStep from './steps/ReviewStep';
import SkillsStep from './steps/SkillsStep';

import {
    createAssessment,
    generateAssessmentQuestions
} from '@features';

const steps = ['Basic Information', 'Select Skills', 'Configure Questions', 'Review & Create'];

const CreateAssessment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Intermediate',
        duration: 60,
        shuffleQuestions: true,
        showResults: false,
        skills: [],
        skillWeights: {},
        questionCount: 5,
        questionTypes: ['multiple-choice'],
        questions: []
    });

    const { user } = useSelector(state => state.auth);
    const { loading } = useSelector(state => state.assessmentQuestion);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerateQuestions = async () => {
        try {
            const result = await dispatch(generateAssessmentQuestions({
                skill: formData.skills[0],
                count: formData.questionCount,
                difficulty: formData.difficulty,
                types: formData.questionTypes
            })).unwrap();

            setFormData(prev => ({
                ...prev,
                questions: result.data?.questions || result
            }));

            setSnackbar({
                open: true,
                message: 'Questions generated successfully!',
                severity: 'success'
            });

            handleNext();
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to generate questions',
                severity: 'error'
            });
        }
    };

    const handleCreateAssessment = async () => {
        try {
            const assessmentData = {
                ...formData,
                status: 'draft',
                createdBy: user?.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                candidates: 0,
                avgScore: 0,
                rating: 0
            };

            await dispatch(createAssessment(assessmentData)).unwrap();

            setSnackbar({
                open: true,
                message: 'Assessment created successfully!',
                severity: 'success'
            });

            setTimeout(() => {
                navigate('/assessments');
            }, 2000);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to create assessment',
                severity: 'error'
            });
        }
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <BasicInfoStep
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={handleNext}
                    />
                );
            case 1:
                return (
                    <SkillsStep
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 2:
                return (
                    <QuestionsStep
                        formData={formData}
                        updateFormData={updateFormData}
                        onGenerate={handleGenerateQuestions}
                        onBack={handleBack}
                        loading={loading}
                    />
                );
            case 3:
                return (
                    <ReviewStep
                        formData={formData}
                        onCreate={handleCreateAssessment}
                        onBack={handleBack}
                        loading={loading}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    Create New Assessment
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Follow the steps below to create a new assessment
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {getStepContent(activeStep)}

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default CreateAssessment;