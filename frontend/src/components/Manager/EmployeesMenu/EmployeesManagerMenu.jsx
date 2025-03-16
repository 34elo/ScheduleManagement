import {Box, Button, Modal} from "@mui/material";
import CardsEmployees from "./CardsEmployees.jsx";
import NotificationEmployee from "./NotificationEmployee.jsx";
import {useEffect, useMemo, useState} from "react";
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
    const [cards, setCards] = useState([{id: 0, title: 'Данные отсутсвуют'}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage

                const response = await axios.get(`${API_URL}/admin/employees/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setEmployees(response.data.employees);  // Устанавливаем полученные данные
            } catch (err) {
                setError('Ошибка загрузки данных');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let arr = [];

        if (employees) {
            employees.forEach((employee, index) => {
                arr.push({id: index, title: employee});
            })
            setCards(arr);

        }
    }, [employees]);

    const [open, setOpen] = useState(false);
    const handleCardClick = (id) => {
        setSelectedCard(id);
        setOpen(true); // Открываем модальное окно при выборе пользователя
    };

    function handleDeleteEmployee() {
        let person = cards.find(card => card.id === selectedCard)?.title || ""
        axios.delete(`${API_URL}/admin/employee/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: {
                'name': person,
            }
        })
        console.log(person)
        console.log(cards, 'DDDD');
        console.log(selectedCard);
        setCards(cards.filter(person => person.id !== selectedCard));
        setOpen(false);
    }


    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                {addEmployeeCards ? <ModalAddEmployee setOpen={setOpen}/>
                    : selectedCard !== null ? (
                            <ModalAccountInfo name={cards.find(card => card.id === selectedCard)?.title || "Неизвестный"}
                                              label='Подробная информация'
                                              role='admin'
                                                close={() => setOpen(false)}>
                                <Button variant="contained" onClick={handleDeleteEmployee}
                                        sx={{backgroundColor: 'black', marginTop: '10px', color: 'white', borderRadius: '25px',
                                            width: '100%'
                                        }}>
                                    Удалить сотрудника
                                </Button>
                            </ModalAccountInfo>)
                        : <div>

                        </div>}
            </Modal>
            <Box sx={{display: "flex", height: "100%", padding: 2, minHeight: "550px"}}>
                {/* Левая колонка с карточками */}
                <Box
                    sx={{
                        minWidth: "150px",
                        width: "66.66%",
                        bgcolor: "#f1f1f1",
                        padding: 2,
                        marginRight: 2,
                        borderRadius: "20px",
                        overflowY: "auto",
                    }}
                >
                    <CardsEmployees
                        selectedCard={selectedCard}
                        setSelectedCard={handleCardClick} // Передаём новую функцию
                        cards={cards}
                        setAddEmployeeCards={setAddEmployeeCards}
                        setOpen={setOpen}
                    />
                </Box>

                {/* Правая колонка */}
                <Box sx={{width: "33.33%", minWidth: "200px", display: "flex", flexDirection: "column", gap: "20px"}}>
                    <>
                        <Box sx={{flex: 1, backgroundColor: "#f1f1f1", borderRadius: "20px"}}>
                            <NotificationEmployee cards={cards}/>
                        </Box>
                    </>
                </Box>
            </Box>
        </>
    );
}
