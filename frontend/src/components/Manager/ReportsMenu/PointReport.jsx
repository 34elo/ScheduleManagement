import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button } from "@mui/material";
import PointReportModal from "./PointReportModal"; // Импорт модального окна

export default function PointReport() {
    const [modalOpen, setModalOpen] = useState(false); // Состояние для управления модальным окном

    return (
        <>
            <Box
                sx={{
                    minWidth: "150px",
                    width: "33.3%",
                    bgcolor: "#f5f9ff", // Светло-голубой фон
                    padding: 2,
                    marginRight: 2,
                    borderRadius: "20px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #05bfff", // Голубая граница
                    boxShadow: "0px 4px 10px rgba(5, 113, 255, 0.1)" // Легкая тень
                }}
            >
                <h2 style={{ margin: 5, color: "#0571ff" }}>Отчёт по точке</h2>
                <p style={{ color: "#0571ff" }}>Желающие работать на данной точке</p>
                <p style={{ color: "#0571ff" }}>Сотрудники, работавшие на точке за период</p>
                <p style={{ color: "#0571ff" }}>Количество отработанных дней за период</p>
                <p style={{ color: "#0571ff" }}>Количество пропущенных дней за период</p>
                <p style={{ color: "#0571ff" }}>Соотношение рабочего и выходного времени</p>
                <p style={{ padding: 10, flexGrow: 1 }}></p> {/* Этот элемент занимает всё оставшееся пространство */}

                <Button
                    variant="contained"
                    onClick={() => setModalOpen(true)} // Открываем модальное окно
                    sx={{
                        backgroundColor: '#ff7105', // Оранжевый цвет кнопки
                        borderRadius: '25px',
                        color: 'white',
                        marginTop: 2, // Отступ сверху, если нужно
                        '&:hover': {
                            backgroundColor: '#e56604', // Темнее при наведении
                        }
                    }}
                >
                    Сформировать
                </Button>
            </Box>

            {/* Модальное окно */}
            {modalOpen && (
                <PointReportModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)} // Закрываем модальное окно
                />
            )}
        </>
    );
}