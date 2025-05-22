import React, {useState} from "react";
import {
    Alert,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem, OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {Box} from "@mui/system";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

export default function NotificationEmployee({cards}) {
    const [text, setText] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notificationStatus, setNotificationStatus] = useState(null);

    const handleEmployeeChange = (event) => {
        setSelectedEmployees(event.target.value);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const sendNotification = async () => {
        if (!text.trim() || selectedEmployees.length === 0) {
            setNotificationStatus({type: "error", message: "Заполните текст и выберите сотрудников"});
            return;
        }

        setLoading(true);
        setNotificationStatus(null);

        try {
            await axios.post(
                `${API_URL}/admin/telegram/send_notification/`,
                {
                    persons: selectedEmployees,
                    message: text.trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setText("");
            setSelectedEmployees([]);
            setNotificationStatus({type: "success", message: "Уведомления отправлены"});
        } catch (error) {
            console.error("Ошибка отправки уведомления:", error);
            setNotificationStatus({type: "error", message: "Ошибка при отправке уведомлений"});
        } finally {
            setLoading(false);
        }
    };

    const employeeNames = cards.map((card) => card.title).filter(name => name !== 'Данные отсутствуют');

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: 2,
            width: '100%'
        }}>
            <Typography variant="h6" component="h2" sx={{fontWeight: 600}}>
                Уведомления сотрудникам
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                label="Текст уведомления"
                value={text}
                onChange={handleTextChange}
                sx={{
                    maxWidth: '400px',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                    }
                }}
            />

            <FormControl sx={{width: '100%', maxWidth: '400px'}}>
                <InputLabel>Выберите сотрудников</InputLabel>
                <Select
                    multiple
                    value={selectedEmployees}
                    onChange={handleEmployeeChange}
                    input={<OutlinedInput label="Выберите сотрудников"/>}
                    renderValue={(selected) => (
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    sx={{
                                        backgroundColor: '#0571ff',
                                        color: 'white'
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                    sx={{
                        borderRadius: '8px',
                        '& .MuiSelect-select': {
                            py: 1
                        }
                    }}
                >
                    {employeeNames.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {notificationStatus && (
                <Alert severity={notificationStatus.type} sx={{width: '100%', maxWidth: '400px'}}>
                    {notificationStatus.message}
                </Alert>
            )}

            <Button
                variant="contained"
                onClick={sendNotification}
                disabled={loading}
                sx={{
                    backgroundColor: '#0571ff',
                    color: 'white',
                    borderRadius: '8px',
                    px: 4,
                    py: 1,
                    '&:hover': {
                        backgroundColor: '#0460d6'
                    },
                    '&:disabled': {
                        backgroundColor: '#e0e0e0'
                    }
                }}
            >
                {loading ? 'Отправка...' : 'Отправить уведомления'}
            </Button>
        </Box>
    );
}