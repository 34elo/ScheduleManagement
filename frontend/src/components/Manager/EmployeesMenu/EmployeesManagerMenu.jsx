import {Box, Button, Modal} from "@mui/material";
import CardsEmployees from "./CardsEmployees.jsx";
import NotificationEmployee from "./NotificationEmployee.jsx";
import {useEffect, useState} from "react";
import ModalAddEmployee from "./ModalAddEmployee.jsx";
import ModalAccountInfo from "../../General/AccountInfo/ModalAccountInfo.jsx";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

export default function EmployeesManagerMenu() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [addEmployeeCards, setAddEmployeeCards] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cards, setCards] = useState([{id: 0, title: 'Данные отсутствуют'}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/admin/employees/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmployees(response.data.employees);
            } catch (err) {
                setError('Ошибка загрузки данных');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (employees.length > 0) {
            setCards(employees.map((employee, index) => ({
                id: index,
                title: employee
            })));
        }
    }, [employees]);

    const [open, setOpen] = useState(false);
    const handleCardClick = (id) => {
        setSelectedCard(id);
        setOpen(true);
    };

    const handleDeleteEmployee = async () => {
        const person = cards.find(card => card.id === selectedCard)?.title || "";
        try {
            await axios.delete(`${API_URL}/admin/employee/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                data: { 'name': person }
            });
            setCards(cards.filter(card => card.id !== selectedCard));
            setOpen(false);
        } catch (err) {
            console.error("Ошибка удаления:", err);
        }
    };

    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            p: 2,
            gap: 2,
            minHeight: "550px",
            bgcolor: '#f9f9f9'
        }}>
            {/* Левая колонка */}
            <Box sx={{
                flex: 2,
                bgcolor: "white",
                p: 2,
                borderRadius: "12px",
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                overflowY: "auto",
            }}>
                <CardsEmployees
                    selectedCard={selectedCard}
                    setSelectedCard={handleCardClick}
                    cards={cards}
                    setAddEmployeeCards={setAddEmployeeCards}
                    setOpen={setOpen}
                />
            </Box>

            {/* Правая колонка */}
            <Box sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                minWidth: "250px"
            }}>
                <Box sx={{
                    flex: 1,
                    bgcolor: "white",
                    borderRadius: "12px",
                    p: 2,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                }}>
                    <NotificationEmployee cards={cards}/>
                </Box>
            </Box>

            {/* Модальное окно */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    borderRadius: "12px",
                    boxShadow: 24,
                    p: 3,
                    outline: 'none'
                }}>
                    {addEmployeeCards ? (
                        <ModalAddEmployee setOpen={setOpen}/>
                    ) : selectedCard !== null ? (
                        <ModalAccountInfo
                            name={cards.find(card => card.id === selectedCard)?.title || "Неизвестный"}
                            label='Подробная информация'
                            role='admin'
                            close={() => setOpen(false)}
                        >
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={handleDeleteEmployee}
                                sx={{
                                    mt: 2,
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        bgcolor: 'error.dark'
                                    }
                                }}
                            >
                                Удалить сотрудника
                            </Button>
                        </ModalAccountInfo>
                    ) : null}
                </Box>
            </Modal>
        </Box>
    );
}