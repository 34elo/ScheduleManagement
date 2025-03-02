import {useState} from "react";
import {Button, TextField} from "@mui/material";
import React from "react";
import {Box} from "@mui/system";


export default function AddEmployee() {

    const [name, setName] = useState("");
    const [code, setCode] = useState(null);

    function handleRegistration() {
        console.log('registration', name);
        setCode(() => Array.from({length: 8}, () => Math.floor(Math.random() * 10)).join(''))
    }

    console.log(code)

    function handleChangeText(e) {
        setName(e.target.value);
    }

    return (<Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h2 style={{marginBottom: '10px', marginTop: '10px'}}>Добавить сотрудника</h2>
            <TextField
                sx={{
                    maxWidth: '90%', paddingTop: '10px', width: '250px', margin: '0 auto', paddingBottom: '10px',
                }}
                size="small"
                label="ФИО"
                onChange={handleChangeText}
            />
            <Button variant="contained" onClick={handleRegistration} sx={{backgroundColor: '#c1c1c1'}}>
                Добавить
            </Button>

            {code ? <>
                <h2 style={{marginBottom: '10px', marginTop: '10px'}}>Код {name}</h2>
                <p>{code}</p>
            </> : null}
        </Box>)
}