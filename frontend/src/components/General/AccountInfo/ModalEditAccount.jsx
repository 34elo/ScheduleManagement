import {Box} from "@mui/system";
import {Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

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

export default function ModalEditAccount({setOpen}) {

    const [contact, setContact] = useState();
    const [username, setUsername] = useState();

    function handleUsernameChange(evt) {
        setUsername(evt.target.value);
    }

    function handleContactChange(evt) {
        setContact(evt.target.value);
    }

    function handleButton() {
        console.log('sdf')
        setOpen(false);
        axios.post(`${API_URL}/info`, {
            contact: contact,
            username: username,
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

    }

    return (
        <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom: '10px'}}>
                Изменить информацию
            </Typography>
            <TextField label='Номер телефона' onChange={handleContactChange} sx={{marginBottom: '10px'}}>
            </TextField>
            <TextField label='Телеграм' sx={{marginBottom: '10px'}} onChange={handleUsernameChange}>
            </TextField>
            <Button variant="contained" onClick={handleButton} sx={{backgroundColor: '#c1c1c1', marginTop: '10px', color: 'black'}}>
                Изменить
            </Button>
        </Box>
    )
}
