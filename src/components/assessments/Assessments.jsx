import {
    Alert,
    alpha,
    Box,
    CircularProgress,
    Container,
    Snackbar,
    useTheme
} from '@common';
import { useEffect, useState } from "@react";
import { useDispatch, useSelector } from 'react-redux';

// Import custom components
import AssessmentFilters from './AssessmentFilters';
import AssessmentGrid from './AssessmentGrid';
import AssessmentHeader from './AssessmentHeader';
import AssessmentTabs from './AssessmentTabs';
import CreateAssessmentDrawer from './CreateAssessmentDrawer';
import MobileFab from './MobileFab';
import StatsOverview from './StatsOverview';

// Import Redux actions
import {
    generateAssessmentQuestions,
    getAssessments,
    searchAssessments,
    setFilters,
    setPagination
} from '@features';

// Import data
import { availableSkills, difficultyLevels, questionTypes } from '../../data/assessmentData';

const Assessments = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const assessments = useSelector(state => state.assessments);
    // Redux state
    const {
        popularAssessments,
        filters,
        pagination,
        loading,
        errorMessage
    } = useSelector(state => state.assessments);

    const assessmentsData = assessments?.assessmentsData?.data || [];

    const loadAssessments = () => {
        const statusMap = {
            0: null, // All
            1: 'active',
            2: 'draft',
            3: 'archived'
        };

        const apiFilters = {
            ...filters,
            status: statusMap[selectedTab],
            page: pagination.page,
            limit: pagination.limit
        };

        dispatch(getAssessments(apiFilters));
    };
    useEffect(() => {
        loadAssessments();
        // dispatch(getPopularAssessments());
    }, [dispatch, selectedTab, filters]);


    const handleSearch = (query) => {
        setSearchQuery(query);

        // Clear previous timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set new timeout for debounced search
        if (query.length >= 2) {
            setSearchTimeout(setTimeout(() => {
                dispatch(searchAssessments({ q: query, filters: filters }));
            }, 500));
        } else if (query.length === 0) {
            loadAssessments();
        }
    };

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

    const handleFilterChange = (type, value) => {
        dispatch(setFilters({ [type]: value }));
    };

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
        dispatch(setPagination({ page: 1 })); // Reset to first page
    };

    const handleCreateAssessment = async (formData) => {
        try {
            // Generate questions based on form data
            const questionsData = await dispatch(generateAssessmentQuestions({
                skill: formData.skills[0], // You can modify this based on your requirements
                count: formData.questionCount || 5,
                difficulty: formData.difficulty
            })).unwrap();

            // Create assessment with generated questions
            const newAssessment = {
                ...formData,
                questions: questionsData,
                status: 'draft',
                createdBy: user?.id,
                createdAt: new Date().toISOString()
            };

            // Here you would call your API to save the assessment
            // await dispatch(createAssessment(newAssessment)).unwrap();

            setSnackbar({
                open: true,
                message: 'Assessment created successfully!',
                severity: 'success'
            });

            handleDrawerClose();
            loadAssessments(); // Reload the list
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to create assessment',
                severity: 'error'
            });
        }
    };

    const handleStartAssessment = (assessmentId) => {
        // Navigate to interview session
        window.location.href = `/interview/${assessmentId}`;
    };

    const handleBookmark = async (assessmentId, bookmarked) => {
        try {
            // API call to toggle bookmark
            // await dispatch(toggleBookmark({ assessmentId, bookmarked })).unwrap();

            setSnackbar({
                open: true,
                message: bookmarked ? 'Assessment bookmarked' : 'Bookmark removed',
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to update bookmark',
                severity: 'error'
            });
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#f8fafc',
            background: `radial-gradient(circle at 0% 0%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%),
                   radial-gradient(circle at 100% 100%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%)`
        }}>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <AssessmentHeader
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearch}
                    onNewAssessment={handleDrawerOpen}
                />

                <StatsOverview stats={{
                    totalAssessments: pagination.total,
                    candidatesTested: popularAssessments?.reduce((acc, curr) => acc + (curr.candidates || 0), 0) || 558,
                    averageScore: popularAssessments?.reduce((acc, curr) => acc + (curr.avgScore || 0), 0) / (popularAssessments?.length || 1) || 78,
                    avgDuration: popularAssessments?.reduce((acc, curr) => acc + (curr.duration || 0), 0) / (popularAssessments?.length || 1) || 81
                }} />

                <AssessmentTabs
                    selectedTab={selectedTab}
                    onTabChange={handleTabChange}
                />

                <AssessmentFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    difficultyLevels={difficultyLevels}
                    availableSkills={availableSkills}
                    questionTypes={questionTypes}
                />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : errorMessage ? (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {(errorMessage || '')?.toString()}
                    </Alert>
                ) : (
                    <AssessmentGrid
                        assessments={assessmentsData}
                        selectedTab={selectedTab}
                        onStart={handleStartAssessment}
                        onBookmark={handleBookmark}
                    />
                )}

                <CreateAssessmentDrawer
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    onSubmit={handleCreateAssessment}
                    availableSkills={availableSkills}
                    questionTypes={questionTypes}
                    difficultyLevels={difficultyLevels}
                />

                <MobileFab onClick={handleDrawerOpen} />

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default Assessments;