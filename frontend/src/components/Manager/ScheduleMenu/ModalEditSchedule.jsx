import {Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo/index.js';
import {useState} from "react";
import dayjs from "dayjs";

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
};

const employees = [
    'vasya',
    'petya',
    'marina',
    'katya',
    'kolya'
]

export default function ModalEditSchedule({setOpen}) {

    const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'day'));

    const changeDate = (date) => {
        setSelectedDate(date);
    };
    const [employee, setEmployee] = useState('');

    const handleChangeEmployee = (event) => {
        setEmployee(event.target.value);
    };

    function handleEdit() {
        setOpen(false);
        console.log('Расписание изменено', selectedDate, employee);
    }

    return (
        <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                Изменить расписание

            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                    components={[
                        'DatePicker',
                    ]}
                >
                    <DemoItem label="Выберите дату">
                        <DatePicker
                            value={selectedDate}
                            onChange={changeDate}
                            format="DD/MM/YYYY" // Формат даты
                            minDate={dayjs().add(1, 'day')}
                            maxDate={dayjs().add(30, 'day')}
                            views={['year', 'month', 'day']}
                        />
                    </DemoItem>

                </DemoContainer>
            </LocalizationProvider>
            <div>
                <FormControl fullWidth sx={{marginTop: '10px'}}>
                    <InputLabel id="demo-simple-select-autowidth-label">Cотрудник</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={employee}
                        onChange={handleChangeEmployee}
                        autoWidth
                        label="Сотрудник"
                    >
                        {employees.map((employee) => (
                            <MenuItem value={employee} key={employee}>
                                {employee}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <Button variant="contained" onClick={handleEdit} sx={{backgroundColor: '#c1c1c1', marginTop: '10px'}}>
                Изменить расписание
            </Button>
        </Box>
    )
}