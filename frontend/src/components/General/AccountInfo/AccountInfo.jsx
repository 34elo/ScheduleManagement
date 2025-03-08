import {Avatar} from "@mui/material";
import {Box} from "@mui/system";
import NameField from "./NameField.jsx";
import MoreInfoField from "./MoreInfoField.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

export default function AccountInfo({children, name, label, role, lc = false}) {

    const [info, setInfo] = useState({})
    if (lc) {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    setInfo(response.data)

                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }, [])
    } else {
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${API_URL}/${role}/${(role === 'employee' ? 'admin' : 'employees')}/${name}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    const data = response.data
                    data.name = name
                    setInfo(data)
                    console.log(data)


                } catch (error) {
                    console.log(error)
                }
            }
            fetchData()
        }, [])
    }


    return (<>
        <h2 style={{marginTop: 0}}>
            {label}
        </h2>
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
                <NameField name={info.name}></NameField>
                <MoreInfoField username={info.username ? '@' + info.username : 'Данные отсутсвуют'}
                               contact={info.contact ? '' + info.contact : 'Данные отсутсвуют'}
                               age={info.age ? '' + info.age : 'Данные отсутсвуют'} code={info.code}>
                </MoreInfoField>
            </Box>
            {children}
        </Box>
    </>)
}
