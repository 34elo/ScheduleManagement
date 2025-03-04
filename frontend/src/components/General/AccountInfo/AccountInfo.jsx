import {Avatar} from "@mui/material";
import {Box} from "@mui/system";
import NameField from "./NameField.jsx";
import MoreInfoField from "./MoreInfoField.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

export default function AccountInfo({children, name, label, role}) {

    const [info, setInfo] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/${role}/${(role === 'employee' ? 'admin' : 'employees')}/${name}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setInfo(response.data)
                console.log(response.data, 'response')
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    return (<>
        <h2 style={{marginTop: 0}}>{label}</h2>
        <Box sx={{
            margin: "0 auto",
            maxWidth: '900px',
            backgroundColor: '#f1f1f1',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            padding: '20px',
            gap: '20px',
            flexDirection: {xs: 'column'},
            textAlign: {xs: 'center', sm: 'left'}
        }}>
            <Avatar sx={{width: 180, height: 180, margin: '50px'}}/>
            <Box>
                <NameField name={name} role={role}></NameField>
                <MoreInfoField username={info.username ? '@' + info.username : 'Данные отсутсвуют'}
                               contact={info.contact ? '' + info.contact : 'Данные отсутсвуют'}
                               age={info.age ? '' + info.age : 'Данные отсутсвуют'}></MoreInfoField>
            </Box>
            {children}
        </Box>
    </>)
}
