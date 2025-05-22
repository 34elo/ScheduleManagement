import { Box, Button, TextField, Typography, IconButton, Alert } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../API_URL.js";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '380px',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 3,
    outline: 'none'
};

export default function ModalAddEmployee({ setOpen }) {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [age, setAge] = useState('');
    const [post, setPost] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddEmployee = async () => {
        if (!name.trim()) {
            setError('Введите ФИО сотрудника');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                `${API_URL}/admin/employee`,
                { name: name.trim(), post: post.trim(), age: age.trim() },
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
            setError(error.response?.data?.message || 'Ошибка при добавлении сотрудника');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={styleModal}>
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

            <Typography variant="h6" component="h2" mb={2} textAlign="center">
                Добавить сотрудника
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    label="ФИО сотрудника"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    error={!!error && !name.trim()}
                />

                <TextField
                    fullWidth
                    size="small"
                    label="Должность"
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                />

                <TextField
                    fullWidth
                    size="small"
                    label="Возраст"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/\D/g, ''))}
                    inputProps={{ min: 18, max: 99 }}
                />

                {error && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                        {error}
                    </Alert>
                )}

                {code && (
                    <Alert severity="success" sx={{ mt: 1 }}>
                        <Typography fontWeight="bold">Код сотрудника:</Typography>
                        <Typography variant="body1" sx={{ mt: 1, fontSize: '1.1rem', wordBreak: 'break-all' }}>
                            {code}
                        </Typography>
                    </Alert>
                )}

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleAddEmployee}
                    disabled={loading || !!code}
                    sx={{
                        mt: 2,
                        borderRadius: '8px',
                        py: 1,
                        backgroundColor: '#0571ff',
                        '&:hover': {
                            backgroundColor: '#0460d6'
                        },
                        '&:disabled': {
                            backgroundColor: '#e0e0e0'
                        }
                    }}
                >
                    {loading ? 'Добавление...' : 'Добавить сотрудника'}
                </Button>
            </Box>
        </Box>
    );
}