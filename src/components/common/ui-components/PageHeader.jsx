import { Box, Container, Grid, useTheme } from "@mui/material";
import CommonHeading from "./CommonHeading";
import CommonText from "./CommonText";

/**
 * PageHeader
 * Standardizes the beautiful gradient headers required at the top
 * of major pages (like Welcome, Auth, Interview).
 */
const PageHeader = ({
    title,
    subtitle,
    children, // Actions or extra content
    rightContent, // Component on the right side
    sx = {},
    ...props
}) => {
    const theme = useTheme();

    return (
        <Box sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            color: 'white',
            pt: { xs: 6, md: 8 },
            pb: { xs: 8, md: 12 },
            position: 'relative',
            overflow: 'hidden',
            ...sx
        }} {...props}>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={rightContent ? 6 : 12} textAlign={rightContent ? 'left' : 'center'}>
                        {typeof title === 'string' ? (
                            <CommonHeading variant="h2" sx={{ mb: 2 }}>
                                {title}
                            </CommonHeading>
                        ) : title}

                        {typeof subtitle === 'string' ? (
                            <CommonText variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                                {subtitle}
                            </CommonText>
                        ) : subtitle}

                        {children && (
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: rightContent ? 'flex-start' : 'center' }}>
                                {children}
                            </Box>
                        )}
                    </Grid>

                    {rightContent && (
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                {rightContent}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default PageHeader;
