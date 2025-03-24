import {Button, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Box} from "@mui/system";
import useAuth from "../../hooks/useAuth.js";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {

    const [code, setCode] = useState("");
    const {error, login, isLoggedIn, role} = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setCode(event.target.value);
    };


    useEffect(() => {
        console.log(isLoggedIn, role);
        if (isLoggedIn) {
            console.log("logged in");
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
            console.log(e)
        }
    };
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
                <Button variant="contained" onClick={handleLogin} sx={{backgroundColor: 'black', color: 'white', borderRadius: '25px'}}>
                    Войти
                </Button>
            </Box>
        </>
    );
};