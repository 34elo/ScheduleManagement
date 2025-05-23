import React from "react";
import { Box } from "@mui/system";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CardsEmployees({
    cards,
    selectedCard,
    setSelectedCard,
    setAddEmployeeCards,
    setOpen
}) {
    // Обработка пустого списка
    const displayCards = cards.length > 0 ? cards : [{ id: 0, title: 'Данные отсутствуют' }];

    const handleInfoCard = (id) => {
        setSelectedCard(id);
        setAddEmployeeCards(false);
        setOpen(true);
    };

    const handleAddEmployee = () => {
        setAddEmployeeCards(true);
        setOpen(true);
    };

    return (
        <Box sx={{ width: "100%", p: 1, overflow: 'hidden'}}>
            <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                Сотрудники
            </Typography>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                maxHeight: '500px',
                overflowY: 'auto',
                pr: 1,
                '&::-webkit-scrollbar': {
                    width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '3px'
                }
            }}>
                {displayCards.map((card) => (
                    <Card
                        key={card.id}
                        sx={{
                            borderRadius: "8px",
                            minHeight: '50px',
                            boxShadow: "none",
                            border: selectedCard === card.id
                                ? '2px solid #0571ff'
                                : '1px solid rgba(0,0,0,0.1)',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                borderColor: '#0571ff',
                                backgroundColor: 'rgba(5, 113, 255, 0.05)'
                            },
                        }}
                    >
                        <CardActionArea onClick={() => handleInfoCard(card.id)}>
                            <CardContent sx={{ p: 1.5 }}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: selectedCard === card.id ? 600 : 400,
                                        color: selectedCard === card.id ? '#0571ff' : 'inherit'
                                    }}
                                >
                                    {card.title}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}

                {/* Кнопка добавления */}
                <Card
                    sx={{
                        borderRadius: "8px",
                        boxShadow: "none",
                        border: '1px dashed rgba(0,0,0,0.3)',
                        '&:hover': {
                            borderColor: '#0571ff',
                            backgroundColor: 'rgba(5, 113, 255, 0.05)'
                        },
                    }}
                >
                    <CardActionArea onClick={handleAddEmployee}>
                        <CardContent sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 1.5,
                            color: '#0571ff'
                        }}>
                            <AddIcon sx={{ mr: 1 }} />
                            <Typography variant="body1">Добавить сотрудника</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Box>
    );
}