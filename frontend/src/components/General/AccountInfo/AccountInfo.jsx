import {useState} from "react";
import {Avatar, Button, Modal} from "@mui/material";
import ModalEditAccount from "./ModalEditAccount.jsx";
import {Box} from "@mui/system";
import NameField from "./NameField.jsx";
import MoreInfoField from "./MoreInfoField.jsx";

export default function AccountInfo({ children, name}) {
    function getInfo() {
        return {
            name: name,
            role: 'role',
            description: {
                age: 23,
                contact: '+7 999 123 45 67',
                username: '@username',
            },
        }
    }

    return (<>
        <h2 style={{marginTop: 0}}>Личный кабинет</h2>
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
                <NameField name={getInfo().name} role={getInfo().role}></NameField>
                <MoreInfoField username={getInfo().description.username} contact={getInfo().description.contact} age={getInfo().description.age}></MoreInfoField>
            </Box>
            {children}
        </Box>
    </>)
}
