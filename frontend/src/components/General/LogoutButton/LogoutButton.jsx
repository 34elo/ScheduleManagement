import { Button } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/login");
    };

    return (
        <Button
            variant="contained"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
            sx={{
                backgroundColor: '#ff4444',
                color: 'white',
                borderRadius: '8px',
                px: 3,
                py: 1,
                minWidth: '200px',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                    backgroundColor: '#cc0000',
                    boxShadow: '0 2px 8px rgba(255, 68, 68, 0.3)'
                },
                transition: 'all 0.2s ease'
            }}
        >
            Выйти из системы
        </Button>
    );
}