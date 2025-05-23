import React, { useState, useEffect } from "react";
import { Backdrop, Box, Typography, Button, Snackbar, Alert, IconButton, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo/index.js';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import axios from "axios";
import { API_URL } from "../../../API_URL.js";

export default function PointReportModal({ open, onClose }) {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [points, setPoints] = useState([]);
    const [selectedPoint, setSelectedPoint] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/points/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPoints(response.data || []);
            } catch (err) {
                console.error("Ошибка при загрузке точек:", err);
                setError("Не удалось загрузить список точек.");
            }
        };
        fetchPoints();
    }, []);

    const handleDownload = async () => {
        if (endDate.isBefore(startDate)) {
            setError("Конечная дата не может быть раньше начальной!");
            return;
        }

        if (!selectedPoint) {
            setError("Выберите точку!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const date1 = startDate.format("YYYY-MM-DD");
            const date2 = endDate.format("YYYY-MM-DD");

            const response = await axios.get(`${API_URL}/admin/report/point/download?date1=${date1}&date2=${date2}&point=${selectedPoint}`, {
                responseType: 'blob',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `point_report_${selectedPoint}_${date1}_to_${date2}.docx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            onClose();
        } catch (err) {
            console.error("Ошибка при скачивании отчёта:", err);
            setError("Ошибка при скачивании отчёта. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Backdrop
                open={open}
                onClick={onClose}
                sx={{
                    backdropFilter: 'blur(4px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            />
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '500px',
                    minWidth: '100px',
                    minHeight: '200px',
                    backgroundColor: '#ffffff',
                    borderRadius: "20px",
                    boxShadow: '0px 4px 20px rgba(5, 113, 255, 0.2)',
                    p: 4,
                    border: '1px solid #05bfff',
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                    backdropFilter: 'blur(10px)',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: '#0571ff',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ color: '#0571ff', mb: 2 }}>
                    Выберите диапазон дат и точку
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DemoItem label="Начальная дата">
                            <DatePicker
                                value={startDate}
                                onChange={(newValue) => setStartDate(newValue)}
                                format="MM/DD/YYYY"
                                maxDate={dayjs()}
                                views={['year', 'month', 'day']}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#05bfff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#0571ff',
                                        },
                                    }
                                }}
                            />
                        </DemoItem>
                        <DemoItem label="Конечная дата">
                            <DatePicker
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                format="MM/DD/YYYY"
                                minDate={startDate}
                                maxDate={dayjs()}
                                views={['year', 'month', 'day']}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#05bfff',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#0571ff',
                                        },
                                    }
                                }}
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>

                <FormControl fullWidth sx={{ marginTop: '10px' }}>
                    <InputLabel id="point-select-label" sx={{ color: '#0571ff' }}>Точка</InputLabel>
                    <Select
                        labelId="point-select-label"
                        id="point-select"
                        value={selectedPoint}
                        onChange={(e) => setSelectedPoint(e.target.value)}
                        autoWidth
                        label="Точка"
                        required
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#05bfff',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#0571ff',
                            },
                        }}
                    >
                        {points.map((point, index) => (
                            <MenuItem value={point} key={index} sx={{ color: '#0571ff' }}>
                                {point}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    onClick={handleDownload}
                    disabled={loading}
                    sx={{
                        backgroundColor: '#ff7105',
                        marginTop: '20px',
                        color: 'white',
                        borderRadius: '25px',
                        '&:hover': {
                            backgroundColor: '#e56604',
                        }
                    }}
                >
                    {loading ? "Скачивание..." : "Скачать отчёт"}
                </Button>

                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                >
                    <Alert severity="error" onClose={() => setError(null)} sx={{ bgcolor: '#fff', color: '#ff7105' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}