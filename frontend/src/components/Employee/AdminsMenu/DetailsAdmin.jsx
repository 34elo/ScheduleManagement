import React from "react";

import {Box} from "@mui/system";

export default function DetailsAdmin({name}) {


    return (<Box
            sx={{
                display: "flex", flexDirection: "column", alignItems: "center", height: "100%",
            }}
        >
            <h2 style={{margin: 0, marginTop: "10px", marginBottom: "10px"}}>
                Информация о сотруднике
            </h2>
            {name}
            <Box sx={{flexGrow: 1}}/>
        </Box>);
}