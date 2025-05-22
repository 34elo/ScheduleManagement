import { Box, IconButton, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccountInfo from "./AccountInfo.jsx";

const ModalAccountInfo = ({ children, name, label, role, close }) => {
    const theme = useTheme();

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90vw', sm: '400px' },
        maxWidth: '400px',
        bgcolor: 'background.paper',
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[5],
        p: 3,
        outline: 'none',
        maxHeight: '90vh',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.action.hover,
            borderRadius: '3px'
        }
    };

    return (
        <Box sx={modalStyle}>
            <IconButton
                aria-label="close-modal"
                onClick={close}
                sx={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover
                    }
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            <AccountInfo
                name={name}
                label={label}
                role={role}
                sx={{ mt: 1 }}
            >
                {children}
            </AccountInfo>
        </Box>
    );
};

export default ModalAccountInfo;