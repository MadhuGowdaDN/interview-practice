import { Box, Button, Grid, Typography } from "@common";
import { useNavigate } from "@react";
import AssessmentCard from './AssessmentCard';
import TabPanel from './TabPanel';

const AssessmentGrid = ({ assessments, selectedTab, onStart, onBookmark, onEdit, onDelete, onDuplicate }) => {
    const navigate = useNavigate();

    const filterByStatus = (status) => {
        if (selectedTab === 0) return assessments;
        const statusMap = {
            1: 'active',
            2: 'draft',
            3: 'archived'
        };
        return assessments?.filter(a => a.status === statusMap[selectedTab]) || [];
    };
    const filteredAssessments = filterByStatus(selectedTab);

    const handleEdit = (assessmentId) => {
        navigate(`/assessments/edit/${assessmentId}`);
    };

    const handleDelete = async (assessmentId) => {
        if (window.confirm('Are you sure you want to delete this assessment?')) {
            // API call would go here
            console.log('Delete assessment:', assessmentId);
        }
    };

    const handleDuplicate = (assessmentId) => {
        // API call would go here
        console.log('Duplicate assessment:', assessmentId);
    };

    return (
        <TabPanel value={selectedTab} index={0}>
            {filteredAssessments?.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No assessments found
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/assessments/new')}
                        sx={{ mt: 2 }}
                    >
                        Create New Assessment
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {filteredAssessments.map((assessment) => (
                        <Grid item xs={12} md={6} lg={4} key={assessment.id}>
                            <AssessmentCard
                                assessment={assessment}
                                onStart={onStart}
                                onBookmark={onBookmark}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onDuplicate={handleDuplicate}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}
        </TabPanel>
    );
};

export default AssessmentGrid;