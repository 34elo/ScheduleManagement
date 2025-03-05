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
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100px, 100%), 1fr))",
                    gap: 2,
                }}
            >
                {cards.map((card) => (<Card key={card.id} sx={{borderRadius: "20px", boxShadow: "none",}}>
                        <CardActionArea
                            onClick={() => handleInfoCard(card.id)}
                            data-active={selectedCard === card.id ? "" : undefined}
                            sx={{
                                height: "100%", "&[data-active]": {
                                    backgroundColor: "action.selected", "&:hover": {
                                        backgroundColor: "action.selectedHover",
                                    },
                                },
                            }}
                        >
                            <CardContent sx={{height: "100%"}}>
                                <Typography>{card.title}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>))}
                <Card
                    sx={{
                        borderRadius: "20px",
                        width: "70px",
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 0.3s ease",
                        boxShadow: "none",
                    }}
                >
                    <CardActionArea
                        onClick={handleAddEmployee}
                        data-active={selectedCard === -1 ? "" : undefined}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            "&[data-active]": {
                                backgroundColor: "action.selected", "&:hover": {
                                    backgroundColor: "action.selectedHover",
                                },
                            },
                        }}
                    >
                        <CardContent sx={{display: "flex", justifyContent: "center", alignItems: "center", padding: 0}}>
                            <AddIcon sx={{fontSize: 46, color: "black", opacity: 0.7}}/>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </>);
}
