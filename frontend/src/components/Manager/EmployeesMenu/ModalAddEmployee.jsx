import {Box} from "@mui/system";
import {Button, TextField, Typography} from "@mui/material";

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

    return (
        <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom: '10px'}}>
                Добавить сотруднкиа
            </Typography>
            <TextField label='1' sx={{marginBottom: '10px'}}>
            </TextField>

            <Button variant="contained" onClick={() => setOpen(false)} sx={{backgroundColor: '#c1c1c1', marginTop: '10px'}}>
                Добавить
            </Button>
        </Box>
    )
}
