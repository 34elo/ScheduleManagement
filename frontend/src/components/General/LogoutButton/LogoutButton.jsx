import {Button} from "@mui/material";

export default function LogoutButton() {

    function logOut() {
        localStorage.removeItem("token");
        location.reload();
    }

    return (
        <Button variant='contained'
                style={{margin: '10px', backgroundColor: 'black', color: 'white', borderRadius: '10px'}}
                onClick={logOut}>
            Выйти из системы
        </Button>
    )
}