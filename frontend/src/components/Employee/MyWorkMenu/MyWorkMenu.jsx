import { Box } from "@mui/material";
import React from "react";
import MySchedule from "./MySchedule.jsx";
import MyWishes from "./MyWishes.jsx";

export default function MyWorkMenu(props) {
    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            p: 2,
            gap: 2,
            flexDirection: { xs: 'column', md: 'row' },
            minHeight: "500px"
        }}>
            {/* Левая колонка - Расписание */}
            <Box sx={{
                flex: 2,
                bgcolor: "background.paper",
                borderRadius: "12px",
                boxShadow: 1,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '500px',
                overflow: 'hidden'
            }}>
                <MySchedule />
            </Box>

            {/* Правая колонка - Предпочтения */}
            <Box sx={{
                flex: 1,
                bgcolor: "background.paper",
                borderRadius: "12px",
                boxShadow: 1,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minWidth: { md: "300px" },
                minHeight: '500px'
            }}>
                <MyWishes />
            </Box>
        </Box>
    )
}