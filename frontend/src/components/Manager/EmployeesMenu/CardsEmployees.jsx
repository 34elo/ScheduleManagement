import React from "react";
import {Box} from "@mui/system";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CardsEmployees({cards, selectedCard, setSelectedCard, setAddEmployeeCards, setOpen}) {
    if (!cards.length > 0) {
        cards = [{id: 0, name: 'Данные отсутствуют'}];
    }
    console.log(cards, 'CARDS');
    function handleInfoCard(id) {
        setSelectedCard(id);
        setAddEmployeeCards(false);
        setOpen(true);
    }
    function handleAddEmployee() {
        setAddEmployeeCards(true)
        setOpen(true)
    }

    return (<>
            <h2 style={{paddingBottom: "10px", margin: 0}}>Сотрудники</h2>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column", // Элементы выстраиваются вертикально
                    gap: 1, // Отступ между элементами
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        sx={{
                            borderRadius: "10px", // Скругление углов
                            boxShadow: "none", // Убираем тень
                            width: "100%", // Ширина на всю доступную ширину
                            "&:hover": {
                                backgroundColor: "action.hover", // Цвет фона при наведении
                            },
                        }}
                    >
                        <CardActionArea
                            onClick={() => handleInfoCard(card.id)}
                            data-active={selectedCard === card.id ? "" : undefined}
                            sx={{
                                width: "100%",
                            }}
                        >
                            <CardContent sx={{ padding: 2 }}> {/* Отступы внутри карточки */}
                                <Typography variant="body1">{card.title}</Typography> {/* Текст карточки */}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}

                {/* Кнопка добавления сотрудника */}
                <Card
                    sx={{
                        borderRadius: "10px",
                        boxShadow: "none",
                        width: "100%",
                        "&:hover": {
                            backgroundColor: "action.hover",
                        },
                    }}
                >
                    <CardActionArea
                        onClick={handleAddEmployee}
                        data-active={selectedCard === -1 ? "" : undefined}
                        sx={{
                            width: "100%",
                            "&[data-active]": {
                                backgroundColor: "action.selected",
                                "&:hover": {
                                    backgroundColor: "action.selectedHover",
                                },
                            },
                        }}
                    >
                        <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
                            <AddIcon sx={{ fontSize: 24, color: "black", opacity: 0.7 }} /> {/* Иконка добавления */}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </>);
}
