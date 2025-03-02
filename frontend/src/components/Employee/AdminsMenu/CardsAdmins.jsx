import {Box} from "@mui/system";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";


export default function CardsAdmins({cards, selectedCard, setSelectedCard}) {
    function handleSelect(id) {
        setSelectedCard(id);
    }

    return (<>
            <h2 style={{paddingBottom: "10px", margin: 0}}>Администраторы</h2>
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
                            onClick={() => handleSelect(card.id)}
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
            </Box>
        </>);
}
