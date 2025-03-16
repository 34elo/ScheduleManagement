import React, { useState } from "react";
import { Box, Typography, Button, Snackbar, Alert, IconButton } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo/index.js';
import CloseIcon from '@mui/icons-material/Close'; // Иконка закрытия
import dayjs from "dayjs";
import axios from "axios";
import { API_URL } from "../../../API_URL.js";

export default function GeneralReportModal({ open, onClose }) {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Функция для скачивания отчёта
    const handleDownload = async () => {
        if (endDate.isBefore(startDate)) {
            setError("Конечная дата не может быть раньше начальной!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Формируем даты в формате YYYY-MM-DD
            const date1 = startDate.format("YYYY-MM-DD");
            const date2 = endDate.format("YYYY-MM-DD");

            // Выполняем запрос на сервер для скачивания файла
            const response = await axios.get(`${API_URL}/admin/report/general/download?date1=${date1}&date2=${date2}`, {
                responseType: 'blob', // Указываем, что ожидаем файл в виде blob
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Создаём ссылку для скачивания
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = `report_${date1}_to_${date2}.docx`; // Имя файла для скачивания
            document.body.appendChild(a);
            a.click(); // Симулируем клик для начала скачивания
            document.body.removeChild(a); // Убираем ссылку после скачивания

            onClose(); // Закрываем модальное окно после скачивания
        } catch (err) {
            console.error("Ошибка при скачивании отчёта:", err);
            setError("Ошибка при скачивании отчёта. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '500px',
                minWidth: '100px',
                minHeight: '180px',
                backgroundColor: 'white',
                borderRadius: "20px",
                boxShadow: 24,
                p: 4,
            }}
        >
            {/* Кнопка закрытия */}
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            <Typography id="modal-modal-title" variant="h5" component="h2">
                Выберите диапазон дат
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
                        />
                    </DemoItem>
                    <DemoItem label="Конечная дата">
                        <DatePicker
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            format="MM/DD/YYYY"
                            minDate={startDate} // Минимальная дата — выбранная начальная дата
                            maxDate={dayjs()}
                            views={['year', 'month', 'day']}
                        />
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>

            <Button
                variant="contained"
                onClick={handleDownload}
                disabled={loading}
                sx={{ backgroundColor: 'black', marginTop: '20px', color: 'white', borderRadius: '25px'}}
            >
                {loading ? "Скачивание..." : "Скачать отчёт"}
            </Button>

            {/* Уведомления об ошибках */}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
            >
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    );
}