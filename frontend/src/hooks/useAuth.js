import {useState, useEffect, useCallback} from 'react';

function useAuth() {
    // 1. Состояния:
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    // 4. Функция для выхода из системы (мемоизированная)
    const logout = useCallback(() => {

        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
        setRole(null);

    }, []);

    // 2. Функция для проверки авторизации при загрузке приложения
    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                console.log('token:', token);
                if (token) {
                    // Запрос на БЕКЕНД о токене
                    if (token === "333") {
                        const userData = {
                            id: 1,
                            name: 'Павел',
                            role: 'manager',
                        }
                        setIsLoggedIn(true);
                        setUser({
                            ...userData,
                        });
                        setRole(userData.role);
                    } else if (token === "111") {
                        const userData = {
                            id: 1,
                            name: 'Павел',
                            role: 'employee',
                        }
                        setIsLoggedIn(true);
                        setUser({
                            ...userData,
                        });
                        setRole(userData.role);
                    } else {
                        console.error('Неправильный токен')
                    }
                }
            } catch (error) {
                console.error('Error in checkAuth:', error); // Добавляем логирование
                logout();
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

    }, [logout]);

    // 3. Функция для логина
    const login = async (code) => {
        console.log('login called, code:', code); // Добавляем логирование
        try {
            if (code === 'employee') {
                const response = {
                    token: 111,
                    userData: {
                        id: 1,
                        name: 'Павел',
                        role: 'employee',
                    }
                }
                console.log('login response:', response); // Добавляем логирование

                localStorage.setItem('token', response.token);
                setUser(response.userData);
                setIsLoggedIn(true);
                setRole(response.userData.role);

            } else if (code === 'manager') {
                const response = {
                    token: 333,
                    userData: {
                        id: 2,
                        name: 'Павел',
                        role: 'manager',
                    }
                }
                console.log('login response:', response); // Добавляем логирование

                localStorage.setItem('token', response.token);
                setUser(response.userData);
                setIsLoggedIn(true);
                setRole(response.userData.role);
            } else {
                console.log('login response:', code);
                setError('Неверный код')
            }
        } catch (error) {
            console.error('Login failed:', error);

        }
    };

    // 5. Возвращаем значения и функции
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