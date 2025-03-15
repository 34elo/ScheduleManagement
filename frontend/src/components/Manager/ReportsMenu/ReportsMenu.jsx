import {Box} from "@mui/system";
import React from "react";
import {API_URL} from "../../../API_URL.js";
import GeneralReport from "./GeneralReport.jsx";
import EmployeeReport from "./EmployeeReport.jsx";
import PointReport from "./PointReport.jsx";

export default function ReportsMenu() {

    return (<>
            <h1 style={{margin: 0}}>Отчёты</h1>
            <Box sx={{display: "flex", height: "100%", padding: 2, minHeight: "550px"}}>
                <EmployeeReport></EmployeeReport>

                <PointReport></PointReport>

                <GeneralReport></GeneralReport>

            </Box>
        </>)
}