// components/assessments/QuestionTypeIcon.jsx
import {
    Build as BuildIcon,
    Chat as ChatIcon,
    Code as CodeIcon,
    Description as DocIcon,
    Mic as MicIcon,
    Psychology as PsychologyIcon,
    Quiz as QuizIcon,
    Videocam as VideoIcon
} from "@icon";

const QuestionTypeIcon = ({ type }) => {
    const icons = {
        'Multiple Choice': <QuizIcon fontSize="small" />,
        'Coding': <CodeIcon fontSize="small" />,
        'Essay': <DocIcon fontSize="small" />,
        'Verbal': <ChatIcon fontSize="small" />,
        'Video Response': <VideoIcon fontSize="small" />,
        'Audio Response': <MicIcon fontSize="small" />,
        'Problem Solving': <PsychologyIcon fontSize="small" />,
        'System Design': <BuildIcon fontSize="small" />
    };

    return icons[type] || <QuizIcon fontSize="small" />;
};

export default QuestionTypeIcon;