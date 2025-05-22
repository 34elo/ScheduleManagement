import { Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [code, setCode] = useState("");
    const { error, login, isLoggedIn, role } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCode(event.target.value);
    };

    useEffect(() => {
        if (isLoggedIn) {
            if (role === "Администратор") {
                navigate("/manager");
            } else if (role === 'Сотрудник') {
                navigate('/employee');
            }
        }
    }, [isLoggedIn, navigate, role]);

    const handleLogin = async () => {
        try {
            await login(code);
        } catch (e) {
            console.error("Login error:", e);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                p: 3
            }}
        >
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    p: 4,
                    borderRadius: '12px',
                    boxShadow: 3,
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        mb: 3,
                        fontWeight: 600,
                        color: 'text.primary'
                    }}
                >
                    Авторизация
                </Typography>

                <TextField
                    fullWidth
                    error={!!error}
                    label="Введите код"
                    variant="outlined"
                    value={code}
                    onChange={handleChange}
                    helperText={error}
                    sx={{ mb: 3 }}
                    InputProps={{
                        sx: {
                            borderRadius: '8px'
                        }
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleLogin}
                    sx={{
                        py: 1.5,
                        borderRadius: '8px',
                        backgroundColor: '#0571ff',
                        color: 'white',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: '#0460d6',
                            boxShadow: '0 2px 8px rgba(5, 113, 255, 0.3)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Войти
                </Button>
            </Box>
        </Box>
    );
}