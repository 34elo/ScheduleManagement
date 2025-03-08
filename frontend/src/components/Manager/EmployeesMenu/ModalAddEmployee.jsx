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

    const [name, setName] = useState(null);
    const [code, setCode] = useState(null);
    const [age, setAge] = useState(null);
    const [post, setPost] = useState(null);

    function handleChangeText(e) {
        setName(e.target.value);
    }

    async function handleAddEmployee() {
        try {
            const response = await axios.post(`${API_URL}/admin/employee`, {
                name: name, post: post, age: age,
            }, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                setCode(response.data.code);
            }
        } catch (error) {
            setCode('Ошибка входа. Перепроверьте данные');
        }
    }


    return (<Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom: '10px'}}>
                Добавить сотрудника
            </Typography>
            <TextField
                sx={{
                    maxWidth: '90%', width: '250px', marginBottom: '10px',
                }}
                size="small"
                label="ФИО"
                onChange={handleChangeText}
            />
            <TextField
                sx={{
                    maxWidth: '90%', width: '250px', marginBottom: '10px',
                }}
                size="small"
                label="Классификация"
                onChange={(e) => setPost(e.target.value)}
            />
            <TextField
                sx={{
                    maxWidth: '90%', width: '250px', marginBottom: '10px',
                }}
                size="small"
                label="Возраст"
                onChange={(e) => setAge(e.target.value)}
            />
            {code ? <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            }}>
                <p style={{
                    display: 'flex',
                }}>Код сотрудника для входа:</p>
               {code}
            </div> : null}
            <Button variant="contained" onClick={handleAddEmployee}
                    sx={{backgroundColor: '#c1c1c1', marginTop: '10px'}}>
                Добавить
            </Button>
        </Box>)
}
