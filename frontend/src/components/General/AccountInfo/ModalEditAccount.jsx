import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Импортируем иконку закрытия
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    minWidth: '100px',
    backgroundColor: 'white',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

export default function ModalEditAccount({setOpen}) {

    const [contact, setContact] = useState();
    const [username, setUsername] = useState();

    function handleUsernameChange(evt) {
        setUsername(evt.target.value);
    }

    function handleContactChange(evt) {
        setContact(evt.target.value);
    }

    function handleButton() {
        console.log('sdf')
        setOpen(false);
        axios.post(`${API_URL}/info`, {
            contact: contact,
            username: username,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

    }

    return (
        <Box sx={styleModal}>
            {/* Кнопка закрытия (крестик) */}
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)} // Закрываем модальное окно
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500], // Серый цвет для крестика
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* Заголовок модального окна */}
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ marginBottom: '20px', marginTop: '20px'}}>
                Изменить информацию
            </Typography>

            {/* Поле для ввода номера телефона */}
            <TextField
                label="Номер телефона"
                onChange={handleContactChange}
                sx={{ marginBottom: '10px', width: '100%' }}
            />

            {/* Поле для ввода телеграма */}
            <TextField
                label="Телеграм"
                onChange={handleUsernameChange}
                sx={{ marginBottom: '10px', width: '100%' }}
            />

            {/* Кнопка "Изменить" */}
            <Button
                variant="contained"
                onClick={handleButton}
                sx={{
                    backgroundColor: 'black',
                    marginTop: '10px',
                    color: 'white',
                    borderRadius: '25px',
                    width: '100%',
                }}
            >
                Изменить
            </Button>
        </Box>
    )
}
