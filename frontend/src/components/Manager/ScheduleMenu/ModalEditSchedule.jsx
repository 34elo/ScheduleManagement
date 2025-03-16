import {Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo/index.js';
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
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
};

export default function ModalEditSchedule({setOpen, selectedPoint}) {
    const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'day'));

    const [addresses, setAddresses] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [employees, setEmployees] = useState([]);

    const changeDate = (date) => {
        setSelectedDate(date);
    };

    const handleChangeEmployee = (event) => {
        setEmployee(event.target.value);
    };

    function handleEdit() {
        setOpen(false);
        let emp = employee;
        if (emp === 'Очистить день' || emp === '' || emp === ' ' || emp === 'Сотрудник') {
            emp = ' '
        }

        const date = selectedDate

        axios.patch(`${API_URL}/admin/edit-schedule/`, {
            person: emp,
            date: date.toISOString(),
            point: selectedPoint,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
    }

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/admin/employees/`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                const data = response.data.employees.map(emp => typeof emp === 'string' ? emp : emp.name);
                data.push('Очистить день');
                setEmployees(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`${API_URL}/points/`, {
                    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                });
                setAddresses(response.data || []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAddresses();
    }, []);

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        const selectedValues = typeof value === 'string' ? value.split(',') : value;
        axios.patch(`${API_URL}/`)
        setEmployee(selectedValues);
    };

    return (
        <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h5" component="h2">
                Изменить расписание
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DemoItem label="Выберите дату">
                        <DatePicker
                            value={selectedDate}
                            onChange={changeDate}
                            format="MM/DD/YYYY"
                            minDate={dayjs().add(1, 'day')}
                            maxDate={dayjs().add(30, 'day')}
                            views={['year', 'month', 'day']}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
            <FormControl fullWidth sx={{marginTop: '10px'}}>
                <InputLabel id="employee-select-label">Сотрудник</InputLabel>
                <Select
                    labelId="employee-select-label"
                    id="employee-select"
                    value={employee || ''}
                    onChange={handleChangeEmployee}
                    autoWidth
                    label="Сотрудник"
                    required
                >
                    {employees.map((item, index) => (
                        <MenuItem value={item} key={index}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <Button
                    variant="contained"
                    onClick={handleEdit}
                    sx={{
                        backgroundColor: 'black',
                        borderRadius: '25px',
                        color: 'white',
                        width: 'fit-content', // Ширина по содержимому
                    }}
                >
                    Изменить расписание
                </Button>
            </Box>
        </Box>
    );
}