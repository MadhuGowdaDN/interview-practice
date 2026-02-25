// components/assessments/steps/BasicInfoStep.jsx
import {
    Box,
    Button,
    CommonSelect,
    FormControlLabel,
    MenuItem,
    Slider,
    Switch,
    TextField,
    Typography
} from "@common";

const BasicInfoStep = ({ formData, updateFormData, difficultyLevels, onNext }) => {
    return (
        <Box sx={{ mt: 2 }}>
            <TextField
                fullWidth
                label="Assessment Title"
                placeholder="e.g., Full Stack Developer Assessment"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                placeholder="Describe what this assessment evaluates..."
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                sx={{ mb: 2 }}
            />
            <CommonSelect
                name="difficulty"
                label="Difficulty Level"
                value={formData.difficulty}
                onChange={(e) => updateFormData('difficulty', e.target.value)}
                sx={{ mb: 2 }}
            >
                {difficultyLevels.map((level) => (
                    <MenuItem key={level} value={level} sx={{ textTransform: 'capitalize' }}>
                        {level}
                    </MenuItem>
                ))}
            </CommonSelect>
            <Box sx={{ mb: 2 }}>
                <Typography gutterBottom>Duration (minutes)</Typography>
                <Slider
                    value={formData.duration}
                    onChange={(e, val) => updateFormData('duration', val)}
                    valueLabelDisplay="auto"
                    step={15}
                    marks
                    min={15}
                    max={180}
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.shuffleQuestions}
                            onChange={(e) => updateFormData('shuffleQuestions', e.target.checked)}
                        />
                    }
                    label="Shuffle Questions"
                />
            </Box>
            <Box sx={{ mb: 2 }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.showResults}
                            onChange={(e) => updateFormData('showResults', e.target.checked)}
                        />
                    }
                    label="Show Results Immediately"
                />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={onNext}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default BasicInfoStep;