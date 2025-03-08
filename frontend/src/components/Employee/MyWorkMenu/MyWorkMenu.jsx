import {Box} from "@mui/material";
import React from "react";
import MySchedule from "./MySchedule.jsx";
import MyWishes from "./MyWishes.jsx";

export default function MyWorkMenu(props) {
    return (<>
        <Box sx={{display: "flex", height: "100% ", margin: 2, minHeight: "450px"}}>
            {/* Левая колонка с карточками */}
            <Box
                sx={{
                    minWidth: '250px',
                    width: "66.66%",
                    bgcolor: "#f1f1f1",
                    marginRight: 2,
                    borderRadius: "20px",
                    overflowY: "auto",
                }}
            >
                <MySchedule></MySchedule>
            </Box>

            {/* Правая колонка */}
            <Box sx={{
                width: "33.33%",
                minWidth: "200px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                bgcolor: "#f1f1f1",
                borderRadius: "20px",
            }}>
                <MyWishes></MyWishes>
            </Box>
        </Box>
    </>)
}