import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../API_URL.js";
import axios from "axios";
import { Button } from "@mui/material";

export default function GeneralReport() {

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
                }}
            >
                <h4 style={{ margin: 0 }}>Общий отчет</h4>

                <p>{data.period && data.period}</p>
                <p>Лучший работник - {data.most_hardworking_employee && data.most_hardworking_employee.name}</p>
                <p>Худший работник - {data.least_hardworking_employee && data.least_hardworking_employee.name}</p>

                <ol> Лучшие точки <br />
                    {data.top_points && data.top_points.map((item, index) => {
                        return (
                            <>{index + 1}. {item.name} - {item.working_time}<br/></>
                        )
                    })}
                </ol>

                <ol> Худшие точки <br />
                    {data.worst_points && Array.isArray(data.worst_points) && data.worst_points.map((item, index) => {
                        return (
                            <>{index + 1}. {item.name} - {item.working_time}<br/></>
                        )
                    })}
                </ol>

                <Button variant="contained" onClick={handleDownload}
                        sx={{ backgroundColor: '#c1c1c1', marginLeft: '25px', borderRadius: '25px', color: 'white' }}>
                    Скачать отчет
                </Button>
            </Box>
        </>
    );
}
