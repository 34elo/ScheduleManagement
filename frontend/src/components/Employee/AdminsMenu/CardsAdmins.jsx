import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";

export default function CardsAdmins({ cards, selectedCard, setSelectedCard }) {
    const handleSelect = (id) => {
        setSelectedCard(id);
    };

    return (
        <>
            <h2 style={{ paddingBottom: "10px", margin: 0 }}>Администраторы</h2>
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
                            onClick={() => handleSelect(card.id)}
                            data-active={selectedCard === card.id ? "" : undefined}
                            sx={{
                                width: "100%",
                                "&[data-active]": {
                                    backgroundColor: "action.selected", // Цвет фона для активной карточки
                                    "&:hover": {
                                        backgroundColor: "action.selectedHover", // Цвет фона при наведении на активную карточку
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{ padding: 2 }}> {/* Отступы внутри карточки */}
                                <Typography variant="body1">{card.title}</Typography> {/* Текст карточки */}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </>
    );
}