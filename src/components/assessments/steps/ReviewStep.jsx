// components/assessments/steps/ReviewStep.jsx
import { generateAssessmentQuestions, saveQuestionsToAssessment } from '@features';
import {
    Add as AddIcon,
    CheckCircle as CheckIcon,
    Info as InfoIcon,
    Quiz as QuestionsIcon,
    Schedule as ScheduleIcon,
    Psychology as SkillsIcon
} from "@icon";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    alpha
} from "@common";
import { useTheme } from "@common";
import { useState } from "@react";
import { useDispatch, useSelector } from 'react-redux';
import DifficultyChip from '../DifficultyChip';
import { GlassCard } from '../styled/AssessmentStyled';
import ReviewGeneratedQuestions from './ReviewGeneratedQuestions';

const ReviewStep = ({ formData, onClose, onBack }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const getTotalQuestions = () => {
        return Object.values(formData.questions?.configs || {}).reduce(
            (sum, config) => sum + (config.count || 0),
            0
        );
    };

    const getTotalPoints = () => {
        return Object.values(formData.questions?.configs || {}).reduce(
            (sum, config) => sum + ((config.count || 0) * (config.points || 0)),
            0
        );
    };

    const getTotalTime = () => {
        return Object.values(formData.questions?.configs || {}).reduce(
            (sum, config) => sum + ((config.count || 0) * (config.timeLimit || 2)),
            0
        );
    };

    const onCreate = () => {
        console.log("formData ", formData)
        dispatch(generateAssessmentQuestions({
            "skills": formData?.skills,
            "questionTypes": Object.keys(formData?.questions?.configs)?.map(item => item),
            "numberOfQuestions": formData?.questions?.configs?.['multiple-choice']?.count ||
                formData?.questions?.configs?.['coding']?.count || 15,
            "difficulty": formData?.difficulty || "medium",
        })).then(res => {
            console.log("res ", res, res?.payload?.success)
            if (res?.payload?.success) {
                setShowPopup(true);
            }
        })
    }
    const questionsData = useSelector(state => state?.assessmentQuestion?.generateQuestionsData) || {};
    // export class CreateAssessmentDto {
    //     @IsString()
    //     @IsNotEmpty()
    //     title: string;

    //     @IsString()
    //     @IsOptional()
    //     description?: string;

    //     @IsEnum(AssessmentStatus)
    //     @IsOptional()
    //     status?: AssessmentStatus;

    //     @IsArray()
    //     @IsString({ each: true })
    //     @IsOptional()
    //     skills?: string[];

    //     @IsEnum(DifficultyLevel)
    //     @IsNotEmpty()
    //     difficulty: DifficultyLevel;

    //     @IsArray()
    //     @IsString({ each: true })
    //     @IsOptional()
    //     questionTypes?: string[];

    //     @IsArray()
    //     @ValidateNested({ each: true })
    //     @Type(() => QuestionDto)
    //     @IsOptional()
    //     questions?: QuestionDto[];

    //     @IsNumber()
    //     @Min(1)
    //     @Max(180)
    //     duration: number;

    //     @IsOptional()
    //     metadata?: Record<string, any>;
    // }
    const handleSaveQuestions = () => {
        dispatch(saveQuestionsToAssessment({
            title: formData?.title || '',
            description: formData?.description || '',
            status: "active",
            skills: formData?.skills,
            difficulty: formData?.difficulty,
            questionTypes: formData?.questions?.selectedTypes,
            questions: questionsData?.data?.questions,
            duration: formData?.duration,
        }))
    }

    return (
        <Box sx={{ mt: 2 }}>
            {/* Assessment Summary */}
            <GlassCard sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                    Assessment Summary
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Title</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {formData.title || 'Full Stack Developer Assessment'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Difficulty</Typography>
                        <Box sx={{ mt: 0.5 }}>
                            <DifficultyChip level={formData.difficulty || 'intermediate'} />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Duration</Typography>
                        <Typography variant="body2">
                            <ScheduleIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                            {formData.duration || 60} minutes
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">Questions</Typography>
                        <Typography variant="body2">
                            <QuestionsIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                            {getTotalQuestions()} total
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Settings */}
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip
                        label={formData.shuffleQuestions ? 'Shuffle: Yes' : 'Shuffle: No'}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        label={formData.showResults ? 'Show Results: Yes' : 'Show Results: No'}
                        size="small"
                        variant="outlined"
                    />
                </Box>
            </GlassCard>

            {/* Skills Section */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <SkillsIcon color="primary" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Skills Assessed
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {(formData.skills || ['React', 'Node.js', 'TypeScript']).map((skill) => (
                        <Chip
                            key={skill}
                            label={skill}
                            sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main
                            }}
                        />
                    ))}
                </Box>
            </Paper>

            {/* Questions Breakdown */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Questions Breakdown
                </Typography>

                <List dense>
                    {Object.entries(formData.questions?.configs || {}).map(([type, config]) => (
                        <ListItem key={type} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <CheckIcon color="success" sx={{ fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={type}
                                secondary={`${config.count} questions • ${config.points} points each • ${config.timeLimit} min per question`}
                                primaryTypographyProps={{ fontWeight: 500 }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {config.count * config.points} pts
                            </Typography>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle2">Total</Typography>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="subtitle2">{getTotalQuestions()} questions</Typography>
                        <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                            {getTotalPoints()} points
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            {/* Info Alert */}
            <Alert
                severity="info"
                sx={{
                    mb: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`
                }}
                icon={<InfoIcon />}
            >
                <AlertTitle sx={{ fontWeight: 600 }}>Ready to create?</AlertTitle>
                This assessment will be available immediately for candidates. You can always edit it later.
            </Alert>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    fullWidth
                    onClick={onCreate}
                    sx={{
                        py: 1.5,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                    }}
                >
                    Create Assessment
                </Button>
                <Button onClick={onBack} variant="outlined">
                    Back
                </Button>
            </Box>

            <ReviewGeneratedQuestions
                open={showPopup}
                onClose={() => setShowPopup(false)}
                questionsData={questionsData}
                onSave={handleSaveQuestions}
            />
        </Box>
    );
};

export default ReviewStep;