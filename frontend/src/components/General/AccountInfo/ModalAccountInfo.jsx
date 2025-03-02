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
    alignItems: 'center'
};

export default function ModalAccountInfo({name}) {

    return (
        <Box sx={styleModal}>
            <AccountInfo name={name}></AccountInfo>
        </Box>
    )
}
