import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Импортируем иконку закрытия
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../API_URL.js";

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

export default function ModalAddEmployee({ setOpen }) {
    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);
    const [age, setAge] = useState(null);
    const [post, setPost] = useState(null);

    const handleChangeText = (e) => {
        setName(e.target.value);
    };

    const handleAddEmployee = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/admin/employee`,
                { name: name, post: post, age: age },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.status === 200) {
                setCode(response.data.code);
            }
        } catch (error) {
            setCode('Ошибка входа. Перепроверьте данные');
        }
    };

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
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ marginBottom: '20px' }}>
                Добавить сотрудника
            </Typography>

            {/* Поле для ввода ФИО */}
            <TextField
                sx={{
                    maxWidth: '90%',
                    width: '250px',
                    marginBottom: '10px',
                }}
                size="small"
                label="ФИО"
                onChange={handleChangeText}
            />

            {/* Поле для ввода классификации */}
            <TextField
                sx={{
                    maxWidth: '90%',
                    width: '250px',
                    marginBottom: '10px',
                }}
                size="small"
                label="Классификация"
                onChange={(e) => setPost(e.target.value)}
            />

            {/* Поле для ввода возраста */}
            <TextField
                sx={{
                    maxWidth: '90%',
                    width: '250px',
                    marginBottom: '10px',
                }}
                size="small"
                label="Возраст"
                onChange={(e) => setAge(e.target.value)}
            />

            {/* Отображение кода сотрудника (если есть) */}
            {code && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <p style={{ display: 'flex' }}>Код сотрудника для входа:</p>
                    {code}
                </div>
            )}

            {/* Кнопка "Добавить" */}
            <Button
                variant="contained"
                onClick={handleAddEmployee}
                sx={{
                    backgroundColor: 'black',
                    marginTop: '10px',
                    color: 'white',
                    borderRadius: '25px',
                }}
            >
                Добавить
            </Button>
        </Box>
    );
}