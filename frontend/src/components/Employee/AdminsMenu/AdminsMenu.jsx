import React, {useMemo, useState} from "react";
import {Box, Modal} from "@mui/material";

import DetailsAdmin from "./DetailsAdmin.jsx";
import CardsAdmins from "./CardsAdmins.jsx";
import ModalAddEmployee from "../../Manager/EmployeesMenu/ModalAddEmployee.jsx";
import ModalAccountInfo from "../../General/AccountInfo/ModalAccountInfo.jsx";

const cards = [{id: 0, title: "Вася Пупкин", description: "Plants are essential for all life."}, {
    id: 1,
    title: "Астафьев Павел",
    description: "Animals are a part of nature."
}, {id: 2, title: "Цветков Владимир", description: "Humans depend on plants and animals for survival."}, {
    id: 3,
    title: "Астафьев Павел",
    description: "Animals are a part of nature."
}, {id: 4, title: "Астафьев Павел", description: "Animals are a part of nature."}, {
    id: 5,
    title: "Астафьев Павел",
    description: "Animals are a part of nature."
}, {id: 6, title: "Астафьев Павел", description: "Animals are a part of nature."},];

export default function AdminsMenu() {
    const [selectedCard, setSelectedCard] = useState(null);

    const [open, setOpen] = useState(false);

    const handleCardClick = (id) => {
        setSelectedCard(id);
        setOpen(true); // Открываем модальное окно при выборе пользователя
    };

    return (<Box sx={{display: "flex", height: "100%", padding: 2, minHeight: "550px"}}>
        <Modal open={open} onClose={() => setOpen(false)}>
            {selectedCard !== null ?
                    <ModalAccountInfo name={cards.find(card => card.id === selectedCard)?.title || "Неизвестный"} label='Подробная информация'/>
                    : <div></div>}
        </Modal>
        <Box
            sx={{
                minWidth: "150px",
                width: "100%",
                bgcolor: "#f1f1f1",
                padding: 2,
                marginRight: 2,
                borderRadius: "20px",
                overflowY: "auto",
            }}
        >
            <CardsAdmins
                selectedCard={selectedCard}
                setSelectedCard={handleCardClick}
                cards={cards}
            />
        </Box>

    </Box>);
}