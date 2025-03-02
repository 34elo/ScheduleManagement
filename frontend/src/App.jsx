import './App.css'
import LoginPage from "./pages/LoginPage/Login.jsx";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import useAuth from "./hooks/useAuth.js";
import PrivateRoute from "./components/Manager/UtilsComponents/PrivateRoute.jsx";
import ManagerPage from "./pages/ManagerPage/Manager.jsx";
import EmployeePage from "./pages/EmployeePage/Employee.jsx";

export default function App() {
    const {loading} = useAuth();

    if (loading) {
        return <div>Loading...</div>;  // Отображаем лоадер
    }

    return (
        <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace/>}
            />
            <Route
                path="/login"
                element={<LoginPage/>}
            />
            <Route
                path="/employee"
                element={<PrivateRoute allowedRoles={['employee']}>
                    <EmployeePage/>
                </PrivateRoute>}
            />
            <Route
                path="/manager"
                element={<PrivateRoute allowedRoles={['manager']}>
                    <ManagerPage/>
                </PrivateRoute>}
            />

        </Routes>
    </BrowserRouter>);
}