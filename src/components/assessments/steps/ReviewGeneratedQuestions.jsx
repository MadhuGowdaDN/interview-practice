import {
    ArrowBack as ArrowBackIcon,
    ArrowForward as ArrowForwardIcon,
    Close as CloseIcon,
    Code as CodeIcon,
    Description as DescriptionIcon,
    Help as HelpIcon,
    Lightbulb as LightbulbIcon,
    Psychology as PsychologyIcon,
    QuestionAnswer as QuestionIcon,
    Save as SaveIcon,
    School as SchoolIcon
} from "@icon";
import {
    Alert,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Fade,
    FormControlLabel,
    Grow,
    IconButton,
    LinearProgress,
    Radio,
    RadioGroup,
    Slide,
    Snackbar,
    TextField,
    Typography,
    Zoom
} from "@common";
import { alpha } from "@common";
import { useState } from "@react";

const ReviewGeneratedQuestions = ({ open, onClose, questionsData, onSave }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showExplanation, setShowExplanation] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [isSaving, setIsSaving] = useState(false);

    const { questions, metadata } = questionsData?.data || { questions: [], metadata: {} };
    const totalQuestions = questions.length;

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const toggleExplanation = (questionId) => {
        setShowExplanation(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onSave({
                questions,
                answers,
                metadata: {
                    ...metadata,
                    completedAt: new Date().toISOString()
                }
            });
            setSnackbar({
                open: true,
                message: 'Questions saved successfully!',
                severity: 'success'
            });
            // setTimeout(() => {
            //     onClose();
            // }, 1500);
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Error saving questions',
                severity: 'error'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'success';
            case 'medium': return 'warning';
            case 'hard': return 'error';
            default: return 'default';
        }
    };

    const getSkillIcon = (skill) => {
        switch (skill?.toLowerCase()) {
            case 'react': return <CodeIcon />;
            case 'javascript': return <PsychologyIcon />;
            case 'node.js': return <SchoolIcon />;
            default: return <QuestionIcon />;
        }
    };

    const getTypeIcon = (type) => {
        switch (type?.toLowerCase()) {
            case 'multiple-choice': return <DescriptionIcon />;
            case 'short-answer': return <QuestionIcon />;
            default: return <HelpIcon />;
        }
    };

    const currentQuestion = questions[activeStep];
    const progress = ((activeStep + 1) / totalQuestions) * 100;

    return (
        <>
            <Dialog
                open={open}
                // onClose={onClose}
                maxWidth="md"
                fullWidth
                TransitionComponent={Slide}
                transitionDuration={500}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        bgcolor: '#f8faff',
                        backgroundImage: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        overflow: 'hidden'
                    }
                }}
            >
                {/* Header with gradient background */}
                <Box sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    p: 3,
                    position: 'relative'
                }}>
                    <DialogTitle sx={{ p: 0, mb: 2, pr: 5 }}>
                        <Box display="flex" alignItems="center" gap={1}>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                                <QuestionIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="h5" fontWeight="bold">
                                    Interview Questions
                                </Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                                    Generated by {metadata?.model || 'AI'} • {metadata?.totalGenerated || 0} questions
                                </Typography>
                            </Box>
                        </Box>
                    </DialogTitle>

                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            top: 16,
                            color: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Metadata chips */}
                    <Box display="flex" gap={1} flexWrap="wrap" mt={2}>
                        {metadata?.skills?.map((skill) => (
                            <Chip
                                key={skill}
                                icon={getSkillIcon(skill)}
                                label={skill}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    '& .MuiChip-icon': { color: 'white' }
                                }}
                            />
                        ))}
                        {metadata?.questionTypes?.map((type) => (
                            <Chip
                                key={type}
                                icon={getTypeIcon(type)}
                                label={type}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    '& .MuiChip-icon': { color: 'white' }
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <DialogContent sx={{ p: 3, mt: 0 }}>
                    {/* Progress bar */}
                    <Box sx={{ mb: 4 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="body2" color="textSecondary">
                                Question {activeStep + 1} of {totalQuestions}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {Math.round(progress)}% Complete
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                bgcolor: alpha('#667eea', 0.1),
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                                    borderRadius: 4
                                }
                            }}
                        />
                    </Box>

                    {currentQuestion && (
                        <Fade in={true} timeout={500} key={activeStep}>
                            <Box>
                                {/* Question card */}
                                <Card
                                    elevation={0}
                                    sx={{
                                        borderRadius: 3,
                                        border: '1px solid',
                                        borderColor: 'rgba(102, 126, 234, 0.2)',
                                        bgcolor: 'white',
                                        mb: 3,
                                        overflow: 'visible'
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        {/* Question header */}
                                        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Badge
                                                    badgeContent={activeStep + 1}
                                                    color="primary"
                                                    sx={{
                                                        '& .MuiBadge-badge': {
                                                            bgcolor: '#667eea',
                                                            color: 'white',
                                                            fontWeight: 'bold'
                                                        }
                                                    }}
                                                >
                                                    <Avatar sx={{ bgcolor: alpha('#667eea', 0.1), color: '#667eea' }}>
                                                        {getSkillIcon(currentQuestion.skill)}
                                                    </Avatar>
                                                </Badge>
                                                <Box>
                                                    <Typography variant="subtitle2" color="textSecondary">
                                                        {currentQuestion.skill}
                                                    </Typography>
                                                    <Typography variant="h6" fontWeight="600">
                                                        {currentQuestion.question}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Chip
                                                label={currentQuestion.difficulty}
                                                size="small"
                                                color={getDifficultyColor(currentQuestion.difficulty)}
                                                sx={{ textTransform: 'capitalize' }}
                                            />
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        {/* Answer section */}
                                        <Box sx={{ mt: 2 }}>
                                            {currentQuestion.type === 'multiple-choice' ? (
                                                <RadioGroup
                                                    value={answers[currentQuestion.id] || ''}
                                                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                                >
                                                    {currentQuestion.options?.map((option, idx) => (
                                                        <Grow in={true} timeout={300 + idx * 100} key={idx}>
                                                            <FormControlLabel
                                                                value={option}
                                                                control={<Radio sx={{ color: '#667eea' }} />}
                                                                label={
                                                                    <Typography variant="body1">
                                                                        {option}
                                                                    </Typography>
                                                                }
                                                                sx={{
                                                                    mb: 1,
                                                                    p: 1,
                                                                    borderRadius: 2,
                                                                    transition: 'all 0.2s',
                                                                    '&:hover': {
                                                                        bgcolor: alpha('#667eea', 0.05)
                                                                    }
                                                                }}
                                                            />
                                                        </Grow>
                                                    ))}
                                                </RadioGroup>
                                            ) : (
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={3}
                                                    variant="outlined"
                                                    placeholder="Type your answer here..."
                                                    value={answers[currentQuestion.id] || ''}
                                                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2,
                                                            '&:hover fieldset': {
                                                                borderColor: '#667eea'
                                                            }
                                                        }
                                                    }}
                                                />
                                            )}
                                        </Box>

                                        {/* Explanation button */}
                                        <Box mt={2} display="flex" justifyContent="flex-end">
                                            <Button
                                                startIcon={<LightbulbIcon />}
                                                onClick={() => toggleExplanation(currentQuestion.id)}
                                                size="small"
                                                sx={{
                                                    color: '#667eea',
                                                    '&:hover': { bgcolor: alpha('#667eea', 0.1) }
                                                }}
                                            >
                                                {showExplanation[currentQuestion.id] ? 'Hide' : 'Show'} Explanation
                                            </Button>
                                        </Box>

                                        {/* Explanation panel */}
                                        {showExplanation[currentQuestion.id] && (
                                            <Zoom in={true}>
                                                <Alert
                                                    icon={<LightbulbIcon />}
                                                    severity="info"
                                                    sx={{
                                                        mt: 2,
                                                        borderRadius: 2,
                                                        bgcolor: alpha('#667eea', 0.05),
                                                        border: '1px solid',
                                                        borderColor: alpha('#667eea', 0.2)
                                                    }}
                                                >
                                                    <Typography variant="subtitle2" fontWeight="600" gutterBottom>
                                                        Explanation:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {currentQuestion.explanation}
                                                    </Typography>
                                                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                                                        Source: {currentQuestion.source} • {currentQuestion.year}
                                                    </Typography>
                                                </Alert>
                                            </Zoom>
                                        )}
                                    </CardContent>
                                </Card>
                            </Box>
                        </Fade>
                    )}
                </DialogContent>

                <DialogActions sx={{ p: 3, pt: 0, gap: 1 }}>
                    <Button
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            color: '#667eea',
                            '&:hover': { bgcolor: alpha('#667eea', 0.1) }
                        }}
                    >
                        Previous
                    </Button>
                    <Box flex={1} />
                    {activeStep === totalQuestions - 1 ? (
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            disabled={isSaving}
                            startIcon={<SaveIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                px: 4,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                                }
                            }}
                        >
                            {isSaving ? 'Saving...' : 'Save Questions'}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                px: 4,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                                }
                            }}
                        >
                            Next
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* Success/Error Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                TransitionComponent={Slide}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    severity={snackbar.severity}
                    sx={{
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        ...(snackbar.severity === 'success' && {
                            bgcolor: '#10b981',
                            color: 'white',
                            '& .MuiAlert-icon': { color: 'white' }
                        }),
                        ...(snackbar.severity === 'error' && {
                            bgcolor: '#ef4444',
                            color: 'white',
                            '& .MuiAlert-icon': { color: 'white' }
                        })
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ReviewGeneratedQuestions;