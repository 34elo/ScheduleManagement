import React, {useEffect, useState} from "react";
import {Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import {Box} from "@mui/system";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";


export default function NotificationEmployee({cards}) {
    const [text, setText] = useState("");
    const [personName, setPersonName] = useState([]);
    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value,);
    };

    function handleChangeText(e) {
        setText(e.target.value);
    }

    function sendNotification() {
        console.log(text, personName);

        axios.post(`${API_URL}/admin/telegram/send_notification/`, {
            persons: personName,
            message: text,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        })
        setText('')
        setPersonName([]);
    }

    const names = cards.map((card) => (card.title))
    return (<>
        <Box sx={{
            display: 'flex', // Используем Flexbox
            flexDirection: 'column', // Располагаем элементы друг под другом
            alignItems: 'center', // Центрируем по горизонтали
            justifyContent: 'center', // Центрируем по вертикали

        }}>
            <h2 style={{margin: 0, marginBottom: '10px'}}>Уведомления</h2>
            <TextField
                sx={{
                    maxWidth: '90%', width: '250px',
                }}
                size="small"
                label="Текст"
                onChange={handleChangeText}

            />
            <FormControl sx={{m: 1, width: '250px', maxWidth: '90%'}}>
                <InputLabel id="demo-multiple-chip-label" variant='outlined'>Имена</InputLabel>
                <Select
                    sx={{
                        maxHeight: '90%', overflow: 'scroll',

                    }}

                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    size='small'
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                    renderValue={(selected) => (<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (<Chip key={value} label={value}/>))}
                    </Box>)}
                >
                    {names.map((name) => (<MenuItem
                        key={name}
                        value={name}
                    >
                        {name}
                    </MenuItem>))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={sendNotification}
                    sx={{backgroundColor: 'black', marginBottom: '20px', color: 'white', borderRadius: '25px'}}>
                Отправить
            </Button>
        </Box>
    </>)
}