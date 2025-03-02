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

export default function ModalEditAccount({setOpen}) {

    function handleEdit() {
        setOpen(false);
        console.log();
    }

    return (
        <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom: '10px'}}>
                Изменить информацию
            </Typography>
            <TextField label='1' sx={{marginBottom: '10px'}}>
            </TextField>
            <TextField label='2' sx={{marginBottom: '10px'}}>
            </TextField>
            <TextField label='3' sx={{marginBottom: '10px'}}>
            </TextField>

            <Button variant="contained" onClick={handleEdit} sx={{backgroundColor: '#c1c1c1', marginTop: '10px'}}>
                Изменить
            </Button>
        </Box>
    )
}
