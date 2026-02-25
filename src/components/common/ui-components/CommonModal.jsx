import { Close as CloseIcon } from "@mui/icons-material";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from "@mui/material";

const CommonModal = ({
    open,
    onClose,
    title,
    children,
    actions,
    maxWidth = "sm",
    fullWidth = true,
    hideCloseIcon = false,
    sx = {},
    ...props
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    ...sx
                }
            }}
            {...props}
        >
            {(title || !hideCloseIcon) && (
                <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight={600}>
                        {title}
                    </Typography>
                    {!hideCloseIcon && onClose ? (
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </DialogTitle>
            )}
            <DialogContent dividers sx={{ p: 3 }}>
                {children}
            </DialogContent>
            {actions && (
                <DialogActions sx={{ p: 2 }}>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default CommonModal;
