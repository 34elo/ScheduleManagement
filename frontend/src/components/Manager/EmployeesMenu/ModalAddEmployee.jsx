import {Box} from "@mui/system";
import {Button, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
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

export default function ModalAddEmployee({setOpen}) {

    const [text, setText] = useState(null);
    const [code, setCode] = useState(null);

    function handleChangeText(e) {
        setText(e.target.value);
    }

    async function handleAddEmployee() {
        const response = await axios.post(`${API_URL}/admin/employee`, {
            name: text,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setCode(response.data.code);
    }


    return (
        <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom: '10px'}}>
                Добавить сотрудника
            </Typography>
            <TextField
                sx={{
                    maxWidth: '90%', width: '250px',
                }}
                size="small"
                label="Текст"
                onChange={handleChangeText}
            />
            {code ? code : null}
            <Button variant="contained" onClick={handleAddEmployee}
                    sx={{backgroundColor: '#c1c1c1', marginTop: '10px'}}>
                Добавить
            </Button>
        </Box>
    )
}
