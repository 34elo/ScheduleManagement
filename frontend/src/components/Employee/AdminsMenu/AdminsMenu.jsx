import React, {useEffect, useMemo, useState} from "react";
import {Box, Modal} from "@mui/material";
import CardsAdmins from "./CardsAdmins.jsx";
import ModalAccountInfo from "../../General/AccountInfo/ModalAccountInfo.jsx";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

export default function AdminsMenu() {
    const [selectedCard, setSelectedCard] = useState(null);

    const [open, setOpen] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [cards, setCards] = useState([]);

    const handleCardClick = (id) => {
        setSelectedCard(id);
        setOpen(true); // Открываем модальное окно при выборе пользователя
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage

                const response = await axios.get(`${API_URL}/employee/admin/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAdmins(response.data.admins);  // Устанавливаем полученные данные
            } catch (err) {
                console.log(err);
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let arr = [];

        if (admins) {
            admins.forEach((employee, index) => {
                arr.push({id: index, title: employee});
            })
            setCards(arr);

        }
    }, [admins]);


    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            padding: 2,
            minHeight: "550px",
            backgroundColor: "#ffffff" // Белый фон
        }}>
            <Modal open={open} onClose={() => setOpen(false)}>
                {selectedCard !== null ?
                    <ModalAccountInfo role='employee'
                                    name={cards.find(card => card.id === selectedCard)?.title || "Неизвестный"}
                                    label='Подробная информация'
                                    close={() => setOpen(false)}/>
                    : <div></div>}
            </Modal>
            <Box
                sx={{
                    minWidth: "150px",
                    width: "100%",
                    bgcolor: "#f5f9ff", // Светло-голубой фон
                    padding: 2,
                    marginRight: 2,
                    borderRadius: "20px",
                    overflowY: "auto",
                    border: "1px solid #05bfff" // Голубая граница
                }}
            >
                <CardsAdmins
                    selectedCard={selectedCard}
                    setSelectedCard={handleCardClick}
                    cards={cards}
                />
            </Box>
        </Box>
    );
}