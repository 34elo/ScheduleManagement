import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import {API_URL} from "../API_URL.js";

function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    // Получаем токен из localStorage
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");

    const auth = useCallback(async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${API_URL}/auth`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setUser(response.data.user);
            setRole(response.data.role);
            setIsLoggedIn(true);
        } catch (err) {
            logout(); // Если ошибка — очищаем данные
        } finally {
            setLoading(false);
        }
    }, [token]);

    // Проверяем авторизацию при изменении токена
    useEffect(() => {
        auth();
    }, [auth]);

    // Функция входа по коду
    const login = useCallback(async (code) => {
        try {
            const response = await axios.get(`${API_URL}/login?input_code=${code}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const newToken = response.data.token;
            localStorage.setItem("token", newToken);
            setToken(newToken);
        } catch (err) {
            setError(err.response?.data?.detail || "Ошибка входа");
        }
    }, []);

    // Функция выхода
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
        setIsLoggedIn(false);
        setRole(null);
    }, []);

    return {
        user,
        isLoggedIn,
        loading,
        role,
        login,
        logout,
        error,
    };
}

export default useAuth;
