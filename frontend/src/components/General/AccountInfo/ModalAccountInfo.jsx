import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Импортируем иконку закрытия
import AccountInfo from "./AccountInfo.jsx"; // Предполагаем, что AccountInfo — это ваш компонент

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    minWidth: '300px',
    backgroundColor: 'white',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
};

export default function ModalAccountInfo({ children, name, label, role, close }) {
    console.log("ModalAccountInfo");

    return (
        <Box sx={styleModal}>
            {/* Кнопка закрытия (крестик) */}
            <IconButton
                aria-label="close"
                onClick={close}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500], // Серый цвет для крестика
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* Основное содержимое модального окна */}
            <AccountInfo name={name} label={label} role={role}>
                {children}
            </AccountInfo>
        </Box>
    );
}