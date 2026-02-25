// components/assessments/steps/QuestionsStep.jsx
import {
    Box,
    Button,
    CommonSelect,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    TextField,
    Typography,
    alpha,
    useTheme
} from "@common";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    DragIndicator as DragIcon
} from "@icon";
import React from "@react";
import QuestionTypeIcon from '../QuestionTypeIcon';

const QuestionsStep = ({ formData, updateFormData, questionTypes, onNext, onBack }) => {
    const theme = useTheme();

    const [selectedTypes, setSelectedTypes] = React.useState(
        formData.questions?.selectedTypes || []
    );

    const [questionConfigs, setQuestionConfigs] = React.useState(
        formData.questions?.configs || {}
    );

    const handleTypeToggle = (type) => {
        const newSelected = selectedTypes.includes(type)
            ? selectedTypes.filter(t => t !== type)
            : [...selectedTypes, type];

        setSelectedTypes(newSelected);

        // Initialize config for new type if not exists
        const newConfigs = { ...questionConfigs };
        if (!newConfigs[type]) {
            newConfigs[type] = {
                count: 5,
                points: 10,
                languages: [],
                difficulty: 'medium',
                timeLimit: 2
            };
        }

        setQuestionConfigs(newConfigs);
        updateFormData('questions', {
            selectedTypes: newSelected,
            configs: newConfigs
        });
    };

    const updateConfig = (type, field, value) => {
        const newConfigs = {
            ...questionConfigs,
            [type]: {
                ...questionConfigs[type],
                [field]: value
            }
        };
        setQuestionConfigs(newConfigs);
        updateFormData('questions', {
            selectedTypes,
            configs: newConfigs
        });
    };

    const getTotalQuestions = () => {
        return Object.values(questionConfigs).reduce((sum, config) => sum + (config.count || 0), 0);
    };

    const getTotalTime = () => {
        return Object.values(questionConfigs).reduce((sum, config) => sum + ((config.count || 0) * (config.timeLimit || 2)), 0);
    };

    return (
        <Box sx={{ mt: 2 }}>
            {/* Summary Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                            {getTotalQuestions()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Total Questions
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.secondary.main, 0.05) }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
                            {getTotalTime()} min
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Est. Duration
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Question Type Selection */}
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Select Question Types
            </Typography>

            <Grid container spacing={1} sx={{ mb: 3 }}>
                {questionTypes.map((type) => (
                    <Grid item xs={6} sm={4} key={type}>
                        <Paper
                            onClick={() => handleTypeToggle(type)}
                            sx={{
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                cursor: 'pointer',
                                border: '2px solid',
                                borderColor: selectedTypes.includes(type)
                                    ? theme.palette.primary.main
                                    : 'divider',
                                bgcolor: selectedTypes.includes(type)
                                    ? alpha(theme.palette.primary.main, 0.05)
                                    : 'background.paper',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                    bgcolor: alpha(theme.palette.primary.main, 0.02)
                                }
                            }}
                        >
                            <Box sx={{ color: selectedTypes.includes(type) ? theme.palette.primary.main : 'text.secondary' }}>
                                <QuestionTypeIcon type={type} />
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>
                                {type}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Configuration for Selected Types */}
            {selectedTypes.length > 0 && (
                <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        Configure Questions
                    </Typography>
                </>
            )}

            {selectedTypes.map((type, index) => (
                <Paper
                    key={type}
                    sx={{
                        p: 2,
                        mb: 2,
                        position: 'relative',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: theme.shadows[2]
                        }
                    }}
                >
                    {/* Drag Handle */}
                    <Box sx={{
                        position: 'absolute',
                        left: -8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'text.disabled',
                        cursor: 'move'
                    }}>
                        <DragIcon />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Box sx={{ color: theme.palette.primary.main }}>
                            <QuestionTypeIcon type={type} />
                        </Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, flex: 1 }}>
                            {type}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={() => handleTypeToggle(type)}
                            sx={{ color: 'error.main' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>

                    <Grid container spacing={2}>
                        {/* Number of Questions */}
                        <Grid item xs={6} sm={3}>
                            <TextField
                                label="Count"
                                type="number"
                                size="small"
                                value={questionConfigs[type]?.count || 5}
                                onChange={(e) => updateConfig(type, 'count', parseInt(e.target.value) || 0)}
                                inputProps={{ min: 1, max: 50 }}
                                fullWidth
                            />
                        </Grid>

                        {/* Points per Question */}
                        <Grid item xs={6} sm={3}>
                            <TextField
                                label="Points"
                                type="number"
                                size="small"
                                value={questionConfigs[type]?.points || 10}
                                onChange={(e) => updateConfig(type, 'points', parseInt(e.target.value) || 0)}
                                inputProps={{ min: 1, max: 100 }}
                                fullWidth
                            />
                        </Grid>

                        {/* Time Limit */}
                        <Grid item xs={6} sm={3}>
                            <TextField
                                label="Time (min)"
                                type="number"
                                size="small"
                                value={questionConfigs[type]?.timeLimit || 2}
                                onChange={(e) => updateConfig(type, 'timeLimit', parseInt(e.target.value) || 1)}
                                inputProps={{ min: 1, max: 30 }}
                                fullWidth
                            />
                        </Grid>

                        {/* Difficulty */}
                        <Grid item xs={6} sm={3}>
                            <CommonSelect
                                name={`difficulty-${type}`}
                                label="Difficulty"
                                value={questionConfigs[type]?.difficulty || 'medium'}
                                onChange={(e) => updateConfig(type, 'difficulty', e.target.value)}
                                size="small"
                                sx={{ mb: 0 }}
                            >
                                <MenuItem value="easy">Easy</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="hard">Hard</MenuItem>
                            </CommonSelect>
                        </Grid>

                        {/* Type-specific configurations */}
                        {type === 'Coding' && (
                            <Grid item xs={12}>
                                <CommonSelect
                                    name={`languages-${type}`}
                                    label="Programming Languages"
                                    multiple
                                    value={questionConfigs[type]?.languages || []}
                                    onChange={(e) => updateConfig(type, 'languages', e.target.value)}
                                    renderValue={(selected) => selected.join(', ')}
                                    size="small"
                                    sx={{ mb: 0 }}
                                >
                                    <MenuItem value="javascript">JavaScript</MenuItem>
                                    <MenuItem value="python">Python</MenuItem>
                                    <MenuItem value="java">Java</MenuItem>
                                    <MenuItem value="csharp">C#</MenuItem>
                                    <MenuItem value="go">Go</MenuItem>
                                    <MenuItem value="rust">Rust</MenuItem>
                                </CommonSelect>
                            </Grid>
                        )}

                        {type === 'Multiple Choice' && (
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <CommonSelect
                                        name={`options-${type}`}
                                        label="Options per Question"
                                        value={questionConfigs[type]?.options || 4}
                                        onChange={(e) => updateConfig(type, 'options', e.target.value)}
                                        size="small"
                                        sx={{ mb: 0 }}
                                    >
                                        <MenuItem value={2}>2 Options</MenuItem>
                                        <MenuItem value={3}>3 Options</MenuItem>
                                        <MenuItem value={4}>4 Options</MenuItem>
                                        <MenuItem value={5}>5 Options</MenuItem>
                                    </CommonSelect>
                                    <CommonSelect
                                        name={`correctAnswers-${type}`}
                                        label="Correct Answers"
                                        value={questionConfigs[type]?.correctAnswers || 1}
                                        onChange={(e) => updateConfig(type, 'correctAnswers', e.target.value)}
                                        size="small"
                                        sx={{ mb: 0 }}
                                    >
                                        <MenuItem value={1}>Single Answer</MenuItem>
                                        <MenuItem value={2}>Multiple Answers</MenuItem>
                                    </CommonSelect>
                                </Box>
                            </Grid>
                        )}

                        {type === 'Essay' && (
                            <Grid item xs={12}>
                                <TextField
                                    label="Min Words"
                                    type="number"
                                    size="small"
                                    value={questionConfigs[type]?.minWords || 100}
                                    onChange={(e) => updateConfig(type, 'minWords', parseInt(e.target.value))}
                                    inputProps={{ min: 50, max: 1000 }}
                                    fullWidth
                                />
                            </Grid>
                        )}
                    </Grid>
                </Paper>
            ))}

            {/* Add Custom Question Button */}
            {selectedTypes.length > 0 && (
                <Button
                    startIcon={<AddIcon />}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2, mb: 3 }}
                >
                    Add Custom Question
                </Button>
            )}

            {/* Navigation Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={onNext}
                    disabled={selectedTypes.length === 0}
                    fullWidth
                >
                    Next
                </Button>
                <Button onClick={onBack} variant="outlined">
                    Back
                </Button>
            </Box>
        </Box>
    );
};

export default QuestionsStep;