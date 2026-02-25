import {
    Alert,
    Box,
    Button,
    CircularProgress,
    CommonModal,
    Container,
    DialogContentText,
    Paper,
    useTheme
} from "@common";
import { useCallback, useEffect, useNavigate, useParams, useState } from "@react";
import { useDispatch, useSelector } from 'react-redux';

import InterviewHeader from './InterviewHeader';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import ResultsSummary from './ResultsSummary';
import Timer from './Timer';

import {
    completeAssessment,
    getAssessmentById,
    startAssessment, submitAnswer, timeoutAssessment, toggleBookmark, toggleFlag, updateLocalAnswer,
    updateLocalBookmark, updateLocalFlag
} from '@features';

const InterviewSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useDispatch();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [submitDialog, setSubmitDialog] = useState(false);
    const [error, setError] = useState(null);

    // Redux state
    const {
        currentAttempt,
        loading: attemptLoading } = useSelector(state => state.assessmentAttempt);
    const { currentAssessmentId: currentAssessment, loading: assessmentLoading } = useSelector(state => state.assessments);
    const assessmentAttempt = useSelector(state => state.assessmentAttempt);
    const assessments = useSelector(state => state.assessments);
    const generateQuestionsData = assessments?.assessmentsData?.data
    const { currentUser: user } = useSelector(state => state.user);

    useEffect(() => {
        // Load assessment details
        if (id) {
            dispatch(getAssessmentById({ id }));
        }
    }, [dispatch, id]);

    const startNewAttempt = async () => {
        try {
            await dispatch(startAssessment({
                assessmentId: currentAssessment?._id,
                // userId: user?.id,
                deviceInfo: {
                    userAgent: navigator.userAgent,
                    platform: navigator.platform,
                }
            })).unwrap();
        } catch (err) {
            setError('Failed to start assessment. Please try again.');
        }
    };

    useEffect(() => {
        // Start assessment when assessment is loaded and user is available
        // if (currentAssessment && user && !currentAttempt) {
        startNewAttempt();
        // }
    }, [currentAssessment, user]);


    const handleAnswer = useCallback((questionId, answer) => {
        // Update local state immediately for better UX
        dispatch(updateLocalAnswer({ questionId, answer }));
        console.log("coming here questionId ", questionId)
        // Debounce API call
        const timeoutId = setTimeout(async () => {
            try {
                await dispatch(submitAnswer({
                    attemptId: currentAttempt?._id,
                    questionId,
                    answer,
                    timeSpent: 0 // You can track per-question time if needed
                })).unwrap();
            } catch (err) {
                console.error('Failed to submit answer:', err);
            }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [currentAttempt]);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        setSubmitDialog(true);
    };

    const confirmSubmit = async () => {
        try {
            setSubmitDialog(false);
            await dispatch(completeAssessment({
                attemptId: currentAttempt?._id,
                answers: Object.entries(answers).map(([questionId, answer]) => ({
                    questionId: parseInt(questionId),
                    answer
                }))
            })).unwrap();
            setShowResults(true);
        } catch (err) {
            setError('Failed to submit assessment. Please try again.');
        }
    };

    const handleTimeUp = async () => {
        try {
            await dispatch(timeoutAssessment(currentAttempt?._id)).unwrap();
            setShowResults(true);
        } catch (err) {
            setError('Failed to process timeout. Please contact support.');
        }
    };

    const handleBookmark = async (questionId) => {
        const bookmarked = !currentAttempt?.bookmarkedQuestions?.includes(questionId);

        // Update local state
        dispatch(updateLocalBookmark({ questionId, bookmarked }));

        // API call
        try {
            await dispatch(toggleBookmark({
                attemptId: currentAttempt?._id,
                questionId,
                bookmarked
            })).unwrap();
        } catch (err) {
            console.error('Failed to toggle bookmark:', err);
        }
    };

    const handleFlag = async (questionId) => {
        const flagged = !currentAttempt?.flaggedQuestions?.includes(questionId);

        // Update local state
        dispatch(updateLocalFlag({ questionId, flagged }));

        // API call
        try {
            await dispatch(toggleFlag({
                attemptId: currentAttempt?._id,
                questionId,
                flagged
            })).unwrap();
        } catch (err) {
            console.error('Failed to toggle flag:', err);
        }
    };

    // Update time spent periodically
    // useEffect(() => {
    //     const timer = setInterval(async () => {
    //         if (!showResults && currentAttempt && currentAttempt.status === 'in-progress') {
    //             const newTimeSpent = (currentAttempt.timeSpent || 0) + 1;
    //             dispatch(updateLocalTimeSpent(newTimeSpent));

    //             // Debounce API update (update every 10 seconds)
    //             if (newTimeSpent % 10 === 0) {
    //                 try {
    //                     await dispatch(updateTimeSpent({
    //                         attemptId: currentAttempt._id,
    //                         timeSpent: 1
    //                     })).unwrap();
    //                 } catch (err) {
    //                     console.error('Failed to update time:', err);
    //                 }
    //             }
    //         }
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, [showResults, currentAttempt, dispatch]);

    // Use generated questions or assessment questions
    const questions = generateQuestionsData?.length > 0
        ? generateQuestionsData?.[0]?.questions
        : currentAssessment?.questions || [];

    if (assessmentLoading || attemptLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Container>
        );
    }

    if (showResults) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <ResultsSummary
                    answers={currentAttempt?.answers?.reduce((acc, ans) => ({
                        ...acc,
                        [ans.questionId]: ans.userAnswer
                    }), {})}
                    questions={questions}
                    timeSpent={currentAttempt?.timeSpent || 0}
                    onReview={() => setShowResults(false)}
                    onRestart={() => navigate('/assessments')}
                />
            </Container>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Alert severity="info">
                    No questions available for this assessment.
                </Alert>
            </Container>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answers = currentAttempt?.answers?.reduce((acc, ans) => ({
        ...acc,
        [ans.questionId]: ans.userAnswer
    }), {}) || {};
    console.log("answers ", answers);
    console.log("currentQuestion ", currentQuestion);
    console.log("currentQuestionIndex ", currentQuestionIndex);
    console.log("questions ", questions);
    console.log("currentAttempt?.answers ", currentAttempt?.answers);
    console.log("answers[currentQuestion.id] ", answers[currentQuestion.id]);
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <InterviewHeader assessment={currentAssessment} onBack={() => navigate('/assessments')} />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Header with Timer */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                    <Timer
                        initialMinutes={currentAssessment?.duration || 30}
                        onTimeUp={handleTimeUp}
                    />
                </Paper>

                {/* Question */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <QuestionCard
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                        selectedAnswer={answers[currentQuestion.id] || ''}
                        onBookmark={() => handleBookmark(currentQuestion.id)}
                        onFlag={() => handleFlag(currentQuestion.id)}
                        isBookmarked={currentAttempt?.bookmarkedQuestions?.includes(currentQuestion.id)}
                        isFlagged={currentAttempt?.flaggedQuestions?.includes(currentQuestion.id)}
                    />
                </Paper>

                {/* Navigation */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                        variant="outlined"
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        sx={{ borderRadius: 3, px: 4 }}
                    >
                        Previous
                    </Button>
                    {currentQuestionIndex === questions.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                borderRadius: 3,
                                px: 4,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                            }}
                        >
                            Submit Assessment
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ borderRadius: 3, px: 4 }}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </Container>

            {/* Submit Confirmation Dialog */}
            {/* Submit Confirmation Dialog */}
            <CommonModal
                open={submitDialog}
                onClose={() => setSubmitDialog(false)}
                title="Submit Assessment?"
                actions={
                    <>
                        <Button onClick={() => setSubmitDialog(false)}>Cancel</Button>
                        <Button onClick={confirmSubmit} variant="contained" color="primary">
                            Submit
                        </Button>
                    </>
                }
            >
                <DialogContentText>
                    Are you sure you want to submit your assessment?
                    You have answered {Object.keys(answers).length} out of {questions.length} questions.
                </DialogContentText>
            </CommonModal>
        </Box>
    );
};

export default InterviewSession;