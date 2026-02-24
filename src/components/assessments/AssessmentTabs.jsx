// components/assessments/AssessmentTabs.jsx
import { Box, Tab, Tabs } from "@common";

const AssessmentTabs = ({ selectedTab, onTabChange }) => {
    const handleChange = (event, newValue) => {
        onTabChange(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={selectedTab} onChange={handleChange}>
                <Tab label="All Assessments" />
                <Tab label="Active" />
                <Tab label="Drafts" />
                <Tab label="Archived" />
            </Tabs>
        </Box>
    );
};

export default AssessmentTabs;