import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { API_URL } from "../../../API_URL.js";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    bgcolor: 'white',
    borderRadius: '12px',
    boxShadow: 24,
    p: 3,
};

export default function ModalEditSchedule({ setOpen, selectedPoint }) {
    const [selectedDate, setSelectedDate] = useState(dayjs().add(1, 'day'));
    const [employee, setEmployee] = useState('');
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
        if (emp === 'Очистить день' || !emp) {
            emp = ' ';
        }

        const date = selectedDate.add(1, 'day');
        axios.patch(`${API_URL}/admin/edit-schedule/`, {
            person: emp,
            date: date.toISOString(),
            point: selectedPoint,
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
    }

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/admin/employees/`, {
                    headers: { Authorization: `Bearer ${token}` }
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

    return (
        <Box sx={styleModal}>
            <Typography variant="h6" component="h2" mb={2}>
                Изменить расписание
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem label="Выберите дату" sx={{ mb: 2 }}>
                    <DatePicker
                        value={selectedDate}
                        onChange={changeDate}
                        format="DD/MM/YYYY"
                        minDate={dayjs().add(1, 'day')}
                        maxDate={dayjs().add(30, 'day')}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </DemoItem>
            </LocalizationProvider>

            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Сотрудник</InputLabel>
                <Select
                    value={employee}
                    onChange={handleChangeEmployee}
                    label="Сотрудник"
                >
                    {employees.map((item, index) => (
                        <MenuItem value={item} key={index}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                fullWidth
                variant="contained"
                onClick={handleEdit}
                sx={{
                    borderRadius: '8px',
                    py: 1,
                    backgroundColor: '#0571ff',
                    '&:hover': {
                        backgroundColor: '#0460d6'
                    }
                }}
            >
                Сохранить изменения
            </Button>
        </Box>
    );
}