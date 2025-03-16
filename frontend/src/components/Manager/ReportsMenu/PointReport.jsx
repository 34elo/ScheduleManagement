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
                    bgcolor: "#f1f1f1",
                    padding: 2,
                    marginRight: 2,
                    borderRadius: "20px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h2 style={{ margin: 5 }}>Отчёт по точке</h2>
                <p>Желающие работать на данной точке</p>
                <p>Сотрудники, работавшие на точке за период</p>
                <p>Количество отработанных дней за период</p>
                <p>Количество пропущенных дней за период</p>
                <p>Соотношение рабочего и выходного времени</p>
                <p style={{ padding: 10, flexGrow: 1 }}></p> {/* Этот элемент занимает всё оставшееся пространство */}

                <Button
                    variant="contained"
                    onClick={() => setModalOpen(true)} // Открываем модальное окно
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