import {
    BookmarkBorder as BookmarkBorderIcon,
    Bookmark as BookmarkIcon,
    Flag as FlagIcon,
    FlagOutlined as FlagOutlinedIcon
} from "@icon";
import {
    Box,
    Chip,
    IconButton,
    Tooltip,
    Typography,
    alpha,
    useTheme
} from "@common";
import { useCallback } from "@react";
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion';

const QuestionCard = ({
    question,
    onAnswer,
    selectedAnswer,
    onBookmark,
    onFlag,
    isBookmarked,
    isFlagged
}) => {
    const theme = useTheme();

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return '#4CAF50';
            case 'medium': return '#FF9800';
            case 'hard': return '#f44336';
            default: return '#9E9E9E';
        }
    };

    const renderQuestionByType = useCallback(() => {
        switch (question?.type) {
            case 'multiple-choice':
                return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} selectedAnswer={selectedAnswer} />;
            case 'coding':
                return <ShortAnswerQuestion question={question} onAnswer={onAnswer} selectedAnswer={selectedAnswer} />;
            case 'short-answer':
                return <ShortAnswerQuestion question={question} onAnswer={onAnswer} selectedAnswer={selectedAnswer} />;
            default:
                return <MultipleChoiceQuestion question={question} onAnswer={onAnswer} selectedAnswer={selectedAnswer} />;
        }
    }, [question, onAnswer, selectedAnswer]);

    return (
        <Box>
            {/* Question Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    {question?.skill && (
                        <Chip
                            label={question?.skill}
                            size="small"
                            sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 600
                            }}
                        />
                    )}
                    {question?.difficulty && (
                        <Chip
                            label={question.difficulty}
                            size="small"
                            sx={{
                                bgcolor: alpha(getDifficultyColor(question.difficulty), 0.1),
                                color: getDifficultyColor(question.difficulty),
                                fontWeight: 600,
                                textTransform: 'capitalize'
                            }}
                        />
                    )}
                    {question?.type && (
                        <Chip
                            label={question.type.replace('-', ' ')}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Box>
                <Box>
                    <Tooltip title={isBookmarked ? "Remove bookmark" : "Save for later"}>
                        <IconButton size="small" onClick={onBookmark} color={isBookmarked ? "primary" : "default"}>
                            {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isFlagged ? "Clear flag" : "Report issue"}>
                        <IconButton size="small" onClick={onFlag} color={isFlagged ? "warning" : "default"}>
                            {isFlagged ? <FlagIcon /> : <FlagOutlinedIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Question Content */}
            {renderQuestionByType()}

            {/* Metadata */}
            {(question.year || question.source) && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    {question.source} {question.year && `• ${question.year}`}
                </Typography>
            )}
        </Box>
    );
};

export default QuestionCard;