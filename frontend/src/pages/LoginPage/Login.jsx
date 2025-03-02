import {Button, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import useAuth from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {

    const [code, setCode] = useState("");
    const [error, setError] = useState(null); // Храним текст ошибки
    const {login, isLoggedIn, role} = useAuth(); // Получаем функцию login из хука useAuth
    const navigate = useNavigate(); // Получаем функцию navigate

    const handleChange = (event) => {
        setCode(event.target.value);
        setError(null);
    };

    useEffect(() => {
        console.log(isLoggedIn, role);
        if (isLoggedIn) {
            console.log("logged in");
            if (role === "manager") {
                navigate("/manager");
            } else if (role === 'employee') {
                navigate('/employee');
            }
        }
    }, [isLoggedIn, navigate, role]);

    const handleLogin = async () => {
        try {
            await login(code);


        } catch (err) {
            console.error("Ошибка при авторизации:", err);
            setError("Произошла ошибка при авторизации"); // Обрабатываем ошибки авторизации
        }
    };
    console.log(error)

    return (
        <>
            <Box // Оборачиваем весь контент в Box
                sx={{
                    display: 'flex', // Используем Flexbox
                    flexDirection: 'column', // Располагаем элементы друг под другом
                    alignItems: 'center', // Центрируем по горизонтали
                    justifyContent: 'center', // Центрируем по вертикали
                    minHeight: '100vh', // Занимаем всю высоту экрана

                }}
            >
                <Typography variant="h4" gutterBottom>
                    Авторизация
                </Typography>
                <TextField
                    error={!!error}
                    id="outlined-basic"
                    label="Введите код"
                    variant="outlined"
                    value={code}
                    onChange={handleChange}
                    helperText={error}
                    sx={{marginBottom: 2, width: '300px'}}
                />
                <Button variant="contained" onClick={handleLogin} sx={{backgroundColor: '#c1c1c1'}}>
                    Войти
                </Button>
            </Box>
        </>
    );
};