import {Box} from "@mui/system";
import {Avatar, Button, Modal} from "@mui/material";
import NameField from "./NameField.jsx";
import MoreInfoField from "./MoreInfoField.jsx";
import {useState} from "react";
import ModalEditAccount from "./ModalEditAccount.jsx";


export default function PerosnalAccountMenu({name}) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (<>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <ModalEditAccount setOpen={setOpen}></ModalEditAccount>
            </Modal>
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
                flexDirection: {xs: 'column', sm: 'row'},
                textAlign: {xs: 'center', sm: 'left'}
            }}>
                <Avatar sx={{width: 180, height: 180, margin: '50px'}}/>
                <Box>
                    <NameField name={name}></NameField>
                    <MoreInfoField name={name}></MoreInfoField>
                    <Button variant='contained'
                            style={{marginTop: '10px', backgroundColor: 'black', color: 'white', borderRadius: '10px'}}
                            onClick={handleOpen}>
                        Редактировать
                    </Button>
                </Box>
            </Box>
        </>)
}
