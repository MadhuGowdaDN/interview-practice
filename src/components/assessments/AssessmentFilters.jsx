import {
    Clear as ClearIcon,
    FilterList as FilterIcon
} from "@icon";
import {
    alpha,
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Popover,
    Select,
    Slider,
    Typography
} from "@common";
import { useTheme } from "@common";
import { useState } from "@react";

const AssessmentFilters = ({ filters, onFilterChange, difficultyLevels, availableSkills, questionTypes }) => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleDifficultyClick = (level) => {
        const newDifficulties = filters.difficulty.includes(level)
            ? filters.difficulty.filter(d => d !== level)
            : [...filters.difficulty, level];

        onFilterChange('difficulty', newDifficulties);
    };

    const handleSkillChange = (event) => {
        onFilterChange('skills', event.target.value);
    };

    const handleQuestionTypeChange = (event) => {
        onFilterChange('questionTypes', event.target.value);
    };

    const handleDurationChange = (event, newValue) => {
        onFilterChange('duration', newValue);
    };

    const clearFilters = () => {
        onFilterChange('difficulty', []);
        onFilterChange('skills', []);
        onFilterChange('questionTypes', []);
        onFilterChange('duration', [0, 120]);
    };

    const open = Boolean(anchorEl);
    const hasActiveFilters = filters.difficulty.length > 0 || filters.skills.length > 0 ||
        filters.questionTypes.length > 0 || filters.duration[0] > 0 || filters.duration[1] < 120;

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                <Chip
                    icon={<FilterIcon />}
                    label={`Filters${hasActiveFilters ? ' (Active)' : ''}`}
                    onClick={handleFilterClick}
                    color={hasActiveFilters ? 'primary' : 'default'}
                    variant={hasActiveFilters ? 'filled' : 'outlined'}
                    sx={{ borderRadius: 2 }}
                />

                {difficultyLevels.map((level) => (
                    <Chip
                        key={level}
                        label={level}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'capitalize',
                            bgcolor: filters.difficulty.includes(level)
                                ? alpha(theme.palette.primary.main, 0.1)
                                : 'transparent',
                            borderColor: filters.difficulty.includes(level)
                                ? theme.palette.primary.main
                                : 'divider'
                        }}
                        onClick={() => handleDifficultyClick(level)}
                    />
                ))}

                {hasActiveFilters && (
                    <Chip
                        icon={<ClearIcon />}
                        label="Clear all"
                        onClick={clearFilters}
                        size="small"
                        sx={{ borderRadius: 2, ml: 'auto' }}
                    />
                )}
            </Box>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: { width: 320, p: 3 }
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Filter Assessments
                </Typography>

                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Skills</InputLabel>
                    <Select
                        multiple
                        value={filters.skills}
                        onChange={handleSkillChange}
                        label="Skills"
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {availableSkills.map((skill) => (
                            <MenuItem key={skill} value={skill}>
                                {skill}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                    <InputLabel>Question Types</InputLabel>
                    <Select
                        multiple
                        value={filters.questionTypes}
                        onChange={handleQuestionTypeChange}
                        label="Question Types"
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {questionTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Duration (minutes)
                    </Typography>
                    <Slider
                        value={filters.duration}
                        onChange={handleDurationChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={120}
                        step={5}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                            {filters.duration[0]} min
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {filters.duration[1]} min
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button size="small" onClick={handleFilterClose}>Cancel</Button>
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => { handleFilterClose(); }}
                    >
                        Apply Filters
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
};

export default AssessmentFilters;