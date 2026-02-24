// components/assessments/TabPanel.jsx
import { Box } from "@common";

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`assessment-tabpanel-${index}`}
            aria-labelledby={`assessment-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
};

export default TabPanel;