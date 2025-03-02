import {Box, Button, Modal} from "@mui/material";
import CardsEmployees from "./CardsEmployees.jsx";
import NotificationEmployee from "./NotificationEmployee.jsx";
import {useMemo, useState} from "react";
import ModalAddEmployee from "./ModalAddEmployee.jsx";
import ModalAccountInfo from "../../General/AccountInfo/ModalAccountInfo.jsx";

const cards = [
    {id: 0, title: "Вася Пупкин", description: "Plants are essential for all life."},
    {id: 1, title: "Астафьев Павел", description: "Animals are a part of nature."},
    {id: 2, title: "Цветков Владимир", description: "Humans depend on plants and animals for survival."},
    {id: 3, title: "Астафьев Павел", description: "Animals are a part of nature."},
    {id: 4, title: "Астафьев Павел", description: "Animals are a part of nature."},
    {id: 5, title: "Астафьев Павел", description: "Animals are a part of nature."},
    {id: 6, title: "Астафьев Павел", description: "Animals are a part of nature."},
];

export default function EmployeesManagerMenu() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [addEmployeeCards, setAddEmployeeCards] = useState(false);

    const [open, setOpen] = useState(false);
    const handleCardClick = (id) => {
        setSelectedCard(id);
        setOpen(true); // Открываем модальное окно при выборе пользователя
    };

    function handleDeleteEmployee() {
        console.log("handleDeleteEmployee", selectedCard, cards.find(card => card.id === selectedCard)?.title || "Неизвестный");
        setOpen(false);
    }

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                {addEmployeeCards ? <ModalAddEmployee setOpen={setOpen}/>
                    : selectedCard !== null ? (
                            <ModalAccountInfo name={cards.find(card => card.id === selectedCard)?.title || "Неизвестный"}
                                              label='Подробная ифнормация'>
                                <Button variant="contained" onClick={handleDeleteEmployee}
                                        sx={{backgroundColor: '#c1c1c1', marginTop: '10px'}}>
                                    Удалить сотрудника
                                </Button>
                            </ModalAccountInfo>)
                        : <div></div>}
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
                            <NotificationEmployee/>
                        </Box>
                    </>
                </Box>
            </Box>
        </>
    );
}
