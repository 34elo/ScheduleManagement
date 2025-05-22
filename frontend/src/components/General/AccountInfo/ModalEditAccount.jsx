import { Box, Button, TextField, Typography, IconButton, CircularProgress, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../API_URL.js";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxWidth: '90vw',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 3,
    outline: 'none'
};

export default function ModalEditAccount({ setOpen }) {
    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post(`${API_URL}/info`, {
                contact: contact.trim(),
                username: username.trim(),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });
            setSuccess(true);
            setTimeout(() => setOpen(false), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка при сохранении данных');
            console.error('Update error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={styleModal} component="form" onSubmit={handleSubmit}>
            <IconButton
                aria-label="close"
                onClick={() => setOpen(false)}
                sx={{
                    position: 'absolute',
                    right: 12,
                    top: 12,
                    color: 'text.secondary'
                }}
            >
                <CloseIcon />
            </IconButton>

            <Typography variant="h6" component="h2" mb={3} textAlign="center">
                Изменить информацию
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Данные успешно сохранены!
                </Alert>
            )}

            <TextField
                fullWidth
                label="Номер телефона"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                margin="normal"
                placeholder="+7 (XXX) XXX-XX-XX"
            />

            <TextField
                fullWidth
                label="Телеграм"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                placeholder="username"
                sx={{ mb: 3 }}
            />

            <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading || success}
                sx={{
                    py: 1.5,
                    borderRadius: '8px',
                    backgroundColor: '#0571ff',
                    '&:hover': {
                        backgroundColor: '#0460d6'
                    },
                    '&:disabled': {
                        backgroundColor: '#e0e0e0'
                    }
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Сохранить изменения'}
            </Button>
        </Box>
    );
}