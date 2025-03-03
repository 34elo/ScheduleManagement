import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: { "Content-Type": "application/json" },
});

function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    // Устанавливаем заголовок авторизации
    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const auth = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await api.get("/auth", { params: { token } }); // Если сервер не поддерживает `Authorization`
            setUser(response.data.user);
            setRole(response.data.role);
            setIsLoggedIn(true);
        } catch (err) {
            setToken(null);
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser(null);
            setRole(null);
        } finally {
            setLoading(false);
        }
    };

    // Проверяем авторизацию при загрузке
    useEffect(() => {
        auth();
    }, [token]);

    // Логин через код
    const login = async (code) => {
        try {
            const response = await api.get("/login", { params: { input_code: code } });
            const newToken = response.data.token;
            localStorage.setItem("token", newToken);
            setToken(newToken);
            await auth();
        } catch (err) {
            setError(err.response?.data?.detail || "Ошибка входа");
        }
    };

    // Выход
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
        setRole(null);
    };

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
