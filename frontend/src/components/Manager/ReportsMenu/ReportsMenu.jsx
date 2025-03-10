import {Box} from "@mui/system";
import React from "react";
import {API_URL} from "../../../API_URL.js";
import GeneralReport from "./GeneralReport.jsx";

export default function ReportsMenu() {

    return (<>
            <h1 style={{margin: 0}}>Отчеты</h1>
            <Box sx={{display: "flex", height: "100%", padding: 2, minHeight: "550px"}}>
                <GeneralReport></GeneralReport>

                <Box
                    sx={{
                        minWidth: "150px",
                        width: "33.3%",
                        bgcolor: "#f1f1f1",
                        padding: 2,
                        marginRight: 2,
                        borderRadius: "20px",
                        overflowY: "auto",
                    }}
                >
                    Отчет 2
                </Box>

                <Box
                    sx={{
                        minWidth: "150px",
                        width: "33.3%",
                        bgcolor: "#f1f1f1",
                        padding: 2,
                        marginRight: 2,
                        borderRadius: "20px",
                        overflowY: "auto",
                    }}
                >
                    Отчет 3
                </Box>
            </Box>
        </>)
}