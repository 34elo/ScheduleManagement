import { useCallback, useEffect, useState } from "react";
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

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsLoggedIn(false);
        setRole(null);
        setError(null);
    }, []);

    function login() {

    }

    return {
        setError,
        error,
        user,
        isLoggedIn,
        loading,
        role,
        login,
        logout,
    };
}

export default useAuth;
