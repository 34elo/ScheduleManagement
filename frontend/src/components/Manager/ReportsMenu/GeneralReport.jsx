import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button } from "@mui/material";
import GeneralReportModal from "./GeneralReportModal"; // Импорт модального окна

export default function GeneralReport() {
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
                <h2 style={{ margin: 5 }}>Общий отчёт</h2>
                <p>Лучший сотрудник</p>
                <p>Худший сотрудник</p>
                <p>Лучшие точки</p>
                <p>Худшие точки</p>
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
                <GeneralReportModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)} // Закрываем модальное окно
                />
            )}
        </>
    );
}