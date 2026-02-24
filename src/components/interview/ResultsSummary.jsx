import {
    CheckCircle as CorrectIcon,
    Close as IncorrectIcon,
    HelpOutline as UnansweredIcon
} from "@icon";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Grid,
    Paper,
    Typography,
    alpha,
    useTheme
} from "@common";

const ResultsSummary = ({ answers, questions, timeSpent, onReview, onRestart }) => {
    const theme = useTheme();

    const calculateScore = () => {
        let correct = 0;
        questions.forEach(question => {
            const userAnswer = answers[question.id];
            if (userAnswer && userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
                correct++;
            }
        });
        return Math.round((correct / questions.length) * 100);
    };

    const getScoreColor = (score) => {
        if (score >= 80) return '#4CAF50';
        if (score >= 60) return '#FF9800';
        return '#f44336';
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    const score = calculateScore();
    const correctCount = questions.filter(q =>
        answers[q.id] && answers[q.id].toLowerCase() === q.correctAnswer.toLowerCase()
    ).length;

    return (
        <Box>
            {/* Score Card */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    textAlign: 'center',
                    mb: 3,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`
                }}
            >
                <Typography variant="h2" sx={{ fontWeight: 700, color: getScoreColor(score) }}>
                    {score}%
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Assessment Complete!
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Chip
                            icon={<CorrectIcon />}
                            label={`${correctCount} Correct`}
                            sx={{ bgcolor: alpha('#4CAF50', 0.1), color: '#4CAF50' }}
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            icon={<IncorrectIcon />}
                            label={`${questions.length - correctCount} Incorrect`}
                            sx={{ bgcolor: alpha('#f44336', 0.1), color: '#f44336' }}
                        />
                    </Grid>
                    <Grid item>
                        <Chip
                            icon={<UnansweredIcon />}
                            label={`${questions.length - Object.keys(answers).length} Unanswered`}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Stats Grid */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">Time Spent</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>{formatTime(timeSpent)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">Questions</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>{questions.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Question Review */}
            <Typography variant="h6" sx={{ mb: 2 }}>Question Review</Typography>
            {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const isCorrect = userAnswer && userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();

                return (
                    <Card key={question.id} sx={{ mb: 2, border: '1px solid', borderColor: 'divider' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Question {index + 1}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={question.skill}
                                    sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                                />
                                {isCorrect ? (
                                    <Chip size="small" icon={<CorrectIcon />} label="Correct" color="success" />
                                ) : userAnswer ? (
                                    <Chip size="small" icon={<IncorrectIcon />} label="Incorrect" color="error" />
                                ) : (
                                    <Chip size="small" icon={<UnansweredIcon />} label="Unanswered" variant="outlined" />
                                )}
                            </Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {question.question}
                            </Typography>
                            <Box sx={{ bgcolor: alpha(theme.palette.success.main, 0.05), p: 1.5, borderRadius: 2 }}>
                                <Typography variant="body2" color="success.main" sx={{ fontWeight: 600 }}>
                                    Correct Answer: {question.correctAnswer}
                                </Typography>
                                {question.explanation && (
                                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                        {question.explanation}
                                    </Typography>
                                )}
                            </Box>
                        </CardContent>
                    </Card>
                );
            })}

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={onReview}
                    sx={{ borderRadius: 3, py: 1.5 }}
                >
                    Review Answers
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    onClick={onRestart}
                    sx={{ borderRadius: 3, py: 1.5 }}
                >
                    New Assessment
                </Button>
            </Box>
        </Box>
    );
};

export default ResultsSummary;