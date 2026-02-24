// components/assessments/AssessmentHeader.jsx
import {
    Add as AddIcon,
    Assessment as AssessmentIcon,
    Search as SearchIcon
} from "@icon";
import {
    Avatar,
    Box,
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from "@common";
import { useTheme } from "@common";

const AssessmentHeader = ({ searchQuery, setSearchQuery, onNewAssessment }) => {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{
                            bgcolor: theme.palette.primary.main,
                            width: 56,
                            height: 56,
                            boxShadow: theme.shadows[4]
                        }}>
                            <AssessmentIcon />
                        </Avatar>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                Interview Assessments
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Create and manage technical assessments for candidates
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                        <TextField
                            placeholder="Search assessments..."
                            size="small"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: 3, bgcolor: 'white', width: { xs: '100%', md: 300 } }
                            }}
                        />
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={onNewAssessment}
                            sx={{
                                borderRadius: 3,
                                px: 3,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                            }}
                        >
                            New Assessment
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AssessmentHeader;