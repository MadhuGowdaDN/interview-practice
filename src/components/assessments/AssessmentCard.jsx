import { getAssessmentById } from '@features';
import {
    Assessment as AssessmentIcon,
    BookmarkBorder as BookmarkBorderIcon,
    Bookmark as BookmarkIcon,
    Edit as EditIcon,
    MoreVert as MoreIcon,
    Refresh as RefreshIcon,
    PlayArrow as StartIcon
} from "@icon";
import {
    alpha,
    Avatar,
    Box,
    Button,
    CardActions,
    CardContent,
    Chip,
    Grid,
    IconButton,
    LinearProgress,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Rating,
    Tooltip,
    Typography
} from "@common";
import { useTheme } from "@common";
import { useState } from "@react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "@react";
import DifficultyChip from './DifficultyChip';
import QuestionTypeIcon from './QuestionTypeIcon';
import { StyledCard } from './styled/AssessmentStyled';

const AssessmentCard = ({ assessment, onStart, onBookmark, onEdit, onDelete, onDuplicate }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [bookmarked, setBookmarked] = useState(assessment.bookmarked || false);
    const dispatch = useDispatch();
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleBookmarkClick = () => {
        const newBookmarked = !bookmarked;
        setBookmarked(newBookmarked);
        onBookmark(assessment.id, newBookmarked);
    };

    const handleStartClick = (id) => {
        // if (assessment.status === 'draft') {
        // If draft, go to edit mode
        dispatch(getAssessmentById({ id: id })).then(res => {
            if (!res?.payload?.error) {
                navigate(`/interview`);
            }
        })
        // navigate(`/assessments/edit/${assessment.id}`);
        // } else {
        //     // If active, start the assessment
        //     onStart(assessment.id);
        // }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return alpha('#4CAF50', 0.9);
            case 'draft': return alpha('#FF9800', 0.9);
            case 'archived': return alpha('#9E9E9E', 0.9);
            default: return alpha('#9E9E9E', 0.9);
        }
    };

    const getProgressColor = (score) => {
        if (score >= 80) return '#4CAF50';
        if (score >= 60) return '#FF9800';
        return '#f44336';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    };
    return (
        <StyledCard>
            {/* Status Badge */}
            <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 1 }}>
                <Chip
                    label={assessment.status}
                    size="small"
                    sx={{
                        bgcolor: getStatusColor(assessment.status),
                        color: 'white',
                        fontWeight: 600,
                        textTransform: 'capitalize'
                    }}
                />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Avatar sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main
                    }}>
                        <AssessmentIcon />
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate(`/assessments/${assessment.id}`)}>
                                {assessment.title}
                            </Typography>
                            <IconButton size="small" onClick={handleBookmarkClick}>
                                {bookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
                            </IconButton>
                        </Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                            Created {formatDate(assessment.createdAt)} • Last updated {formatDate(assessment.updatedAt)}
                        </Typography>
                    </Box>
                </Box>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {assessment.description}
                </Typography>

                {/* Skills */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                        Required Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {assessment.skills?.map((skill) => (
                            <Chip
                                key={skill}
                                label={skill}
                                size="small"
                                sx={{ borderRadius: 1, fontSize: '0.7rem' }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Metrics */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {assessment.questions?.length || 0}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Questions
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {assessment.duration}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Minutes
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {assessment.candidates || 0}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Taken
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Difficulty and Types */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <DifficultyChip level={assessment.difficulty} />
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        {assessment.questionTypes?.map((type, i) => (
                            <Tooltip key={i} title={type}>
                                <Avatar sx={{ width: 24, height: 24, bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
                                    <Box sx={{ fontSize: '0.8rem', display: 'flex' }}>
                                        <QuestionTypeIcon type={type} />
                                    </Box>
                                </Avatar>
                            </Tooltip>
                        ))}
                    </Box>
                </Box>

                {/* Performance */}
                {assessment.avgScore > 0 && (
                    <Box sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                                Average Score
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {assessment.avgScore}%
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={assessment.avgScore}
                            sx={{
                                height: 4,
                                borderRadius: 2,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                '& .MuiLinearProgress-bar': {
                                    bgcolor: getProgressColor(assessment.avgScore)
                                }
                            }}
                        />
                    </Box>
                )}

                {/* Rating */}
                {assessment.rating > 0 && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={assessment.rating} precision={0.5} size="small" readOnly />
                        <Typography variant="caption" color="text.secondary">
                            ({assessment.rating})
                        </Typography>
                    </Box>
                )}
            </CardContent>

            {/* Actions */}
            <CardActions sx={{ p: 2, pt: 0, justifyContent: 'space-between' }}>
                <Box>
                    <Button
                        size="small"
                        startIcon={assessment.status === 'draft' ? <EditIcon /> : <StartIcon />}
                        color="primary"
                        onClick={() => handleStartClick(assessment?._id)}
                    >
                        {assessment.status === 'draft' ? 'Edit Draft' : 'Start'}
                    </Button>
                    {assessment.status === 'active' && (
                        <Button
                            size="small"
                            startIcon={<RefreshIcon />}
                            onClick={() => navigate(`/assessments/${assessment.id}/retake`)}
                        >
                            Retake
                        </Button>
                    )}
                </Box>
                <Box>
                    <IconButton size="small" onClick={handleMenuOpen}>
                        <MoreIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => { handleMenuClose(); navigate(`/assessments/${assessment.id}`); }}>
                            <ListItemIcon><AssessmentIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>View Details</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => { handleMenuClose(); onEdit(assessment.id); }}>
                            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => { handleMenuClose(); onDuplicate(assessment.id); }}>
                            <ListItemIcon><RefreshIcon fontSize="small" /></ListItemIcon>
                            <ListItemText>Duplicate</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => { handleMenuClose(); onDelete(assessment.id); }} sx={{ color: 'error.main' }}>
                            <ListItemIcon><EditIcon fontSize="small" color="error" /></ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </CardActions>
        </StyledCard>
    );
};

export default AssessmentCard;