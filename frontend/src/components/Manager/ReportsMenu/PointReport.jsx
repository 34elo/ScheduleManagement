import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../API_URL.js";
import axios from "axios";
import { Button } from "@mui/material";

export default function PointReport() {

    const date1 = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0];
    const date2 = new Date().toISOString().split('T')[0];

    const handleDownload = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/report/general/download?date1=${date1}&date2=${date2}`, {
                responseType: 'blob',  // Указываем, что ожидаем файл в виде blob
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            // Создаём ссылку для скачивания
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement("a");
            a.href = url;
            a.download = "general_report.docx"; // Указываем имя скачиваемого файла
            document.body.appendChild(a);
            a.click(); // Симулируем клик для начала скачивания
            document.body.removeChild(a); // Убираем ссылку после скачивания
        } catch (error) {
            console.error("Ошибка при скачивании отчёта:", error);
        }
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${API_URL}/admin/report/general?date1=${date1}&date2=${date2}`, {
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            console.log(response.data);
            setData(response.data);
        }

        fetchData();
    }, []);

    return (
        <>
            <Box
                sx={{
                    minWidth: "150px",
                    width: "33.3%",
                    bgcolor: "#f1f1f1",
                    padding: 2,
                    marginRight: 2,
                    borderRadius: "20px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h2 style={{margin: 5}}>Отчёт по точке</h2>
                <p>Желающие работать на данной точке</p>
                <p>Сотрудники, работавшие на точке за период</p>
                <p>Количество отработанных дней за период</p>
                <p>Количество пропущенных дней за период</p>
                <p>Соотношение рабочего и выходного времени</p>
                <p style={{ padding: 10, flexGrow: 1 }}></p> {/* Этот элемент занимает всё оставшееся пространство */}

                <Button
                    variant="contained"
                    onClick={handleDownload}
                    sx={{
                        backgroundColor: 'black',
                        borderRadius: '25px',
                        color: 'white',
                        marginTop: 2, // Отступ сверху, если нужно
                    }}
                >
                    Сформировать
                </Button>
            </Box>
        </>
    );
}
