import {Button} from "@mui/material";

export default function LogoutButton() {

    function logOut() {
        localStorage.removeItem("token");
        location.reload();
    }

    return (
        <Button variant='contained'
                style={{backgroundColor: 'black', color: 'white', borderRadius: '25px', width:"30%"}}
                onClick={logOut}>
            Выйти из системы
        </Button>
    )
}