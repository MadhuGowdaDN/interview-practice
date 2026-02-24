// components/assessments/steps/SkillsStep.jsx
import {
    Autocomplete,
    Box,
    Button,
    Slider,
    TextField,
    Typography
} from "@common";

const SkillsStep = ({ formData, updateFormData, availableSkills, onNext, onBack }) => {
    const handleSkillsChange = (event, newValue) => {
        updateFormData('skills', newValue);
    };

    const updateWeight = (skill, value) => {
        updateFormData('skillWeights', {
            ...formData.skillWeights,
            [skill]: value
        });
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Autocomplete
                multiple
                options={availableSkills}
                value={formData.skills}
                onChange={handleSkillsChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Skills Required"
                        placeholder="Select skills"
                    />
                )}
                sx={{ mb: 2 }}
            />

            {formData.skills.length > 0 && (
                <>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Weightage Distribution
                    </Typography>
                    {formData.skills.map((skill) => (
                        <Box key={skill} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Typography sx={{ minWidth: 100 }}>{skill}</Typography>
                            <Slider
                                value={formData.skillWeights[skill] || 33}
                                onChange={(e, val) => updateWeight(skill, val)}
                                valueLabelDisplay="auto"
                            />
                            <TextField
                                size="small"
                                sx={{ width: 80 }}
                                value={`${formData.skillWeights[skill] || 33}%`}
                                onChange={(e) => {
                                    const val = parseInt(e.target.value) || 0;
                                    updateWeight(skill, val);
                                }}
                            />
                        </Box>
                    ))}
                </>
            )}

            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={onNext}>
                    Next
                </Button>
                <Button onClick={onBack}>
                    Back
                </Button>
            </Box>
        </Box>
    );
};

export default SkillsStep;