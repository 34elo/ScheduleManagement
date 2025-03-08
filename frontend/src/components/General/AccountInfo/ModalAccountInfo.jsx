import {Box} from "@mui/system";
import {Button, TextField, Typography} from "@mui/material";
import AccountInfo from "./AccountInfo.jsx";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '400px',
    minWidth: '100px',
    backgroundColor: 'white',
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100vh',
    overflow: 'scroll',
};

export default function ModalAccountInfo({children, name, label, role, close}) {
    console.log("ModalAccountInfo");
    return (<Box sx={styleModal}>
            <AccountInfo name={name} label={label} role={role}>
                {children}
            </AccountInfo>
            <Button style={{color: 'black'}} onClick={close}>Назад</Button>
        </Box>)
}
