// components/assessments/CreateAssessmentDrawer.jsx
import {
    Close as CloseIcon
} from "@icon";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    Step,
    StepLabel,
    Stepper,
    Typography
} from "@common";
import { useState } from "@react";

// Import step components
import BasicInfoStep from './steps/BasicInfoStep';
import QuestionsStep from './steps/QuestionsStep';
import ReviewStep from './steps/ReviewStep';
import SkillsStep from './steps/SkillsStep';

const steps = ['Basic Information', 'Select Skills', 'Configure Questions', 'Review & Create'];

const CreateAssessmentDrawer = ({ open, onClose, availableSkills, questionTypes, difficultyLevels }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: '',
        duration: 60,
        shuffleQuestions: true,
        showResults: false,
        skills: [],
        skillWeights: {},
        questions: {}
    });

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <BasicInfoStep
                        formData={formData}
                        updateFormData={updateFormData}
                        difficultyLevels={difficultyLevels}
                        onNext={handleNext}
                    />
                );
            case 1:
                return (
                    <SkillsStep
                        formData={formData}
                        updateFormData={updateFormData}
                        availableSkills={availableSkills}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 2:
                return (
                    <QuestionsStep
                        formData={formData}
                        updateFormData={updateFormData}
                        questionTypes={questionTypes}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                );
            case 3:
                return (
                    <ReviewStep
                        formData={formData}
                        onCreate={onClose}
                        onBack={handleBack}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { width: { xs: '100%', sm: 600 }, p: 3 }
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Create New Assessment
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ mt: 2 }}>
                {getStepContent(activeStep)}
            </Box>
        </Drawer>
    );
};

export default CreateAssessmentDrawer;