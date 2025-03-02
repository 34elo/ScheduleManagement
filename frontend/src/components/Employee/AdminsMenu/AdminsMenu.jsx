import React, {useMemo, useState} from "react";
import {Box} from "@mui/material";

import DetailsAdmin from "./DetailsAdmin.jsx";
import CardsAdmins from "./CardsAdmins.jsx";

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
    const [selectedCard, setSelectedCard] = useState(cards[0]?.id || null);

    const selectedName = useMemo(() => {
        return cards.find((card) => card.id === selectedCard)?.title || "Описание отсутствует";
    }, [selectedCard]);

    return (<Box sx={{display: "flex", height: "100%", padding: 2, minHeight: "550px"}}>
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
            <CardsAdmins
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                cards={cards}
            />
        </Box>

        {/* Правая колонка */}
        <Box sx={{width: "33.33%", minWidth: "200px", display: "flex", flexDirection: "column", gap: "20px"}}>
            <>
                <Box sx={{flex: 1, backgroundColor: "#f1f1f1", borderRadius: "20px", height: "100%"}}>
                    <DetailsAdmin name={selectedName}/>
                </Box>
            </>
        </Box>
    </Box>);
}