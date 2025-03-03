import useAuth from "../../../hooks/useAuth.js";
import {Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";


// eslint-disable-next-line react/prop-types
export default function PrivateRoute({children, allowedRoles}) {

    const {isLoggedIn, loading, role} = useAuth();
    if (loading) {
        return <CircularProgress />;
    }

    if (!isLoggedIn) {
        console.log('Navigate to /login');
        return <Navigate to="/login" replace/>;
    }
    // eslint-disable-next-line react/prop-types
    if (!allowedRoles.includes(role) && allowedRoles) {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>You dont have permission.</p>
            </div>
        );
    }
    return (
        <>
            {children}
        </>
    )
}