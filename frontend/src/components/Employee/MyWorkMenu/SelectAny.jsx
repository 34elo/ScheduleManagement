import {Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";

export default function SelectAny({MyArray, setSelected, label, selectAnything}) {

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        const selectedValues = typeof value === 'string' ? value.split(',') : value;

        setSelected(selectedValues);
    };

    return (<FormControl sx={{m: 1, width: '250px', maxWidth: '90%'}}>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                size="small"
                value={selectAnything}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label={label}/>}
                renderValue={(selected) => (<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                        {selected.map((value) => (<Chip key={value} label={value}/>))}
                    </Box>)}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200, overflow: 'auto',
                        },
                    },
                }}
            >
                {MyArray.map((item) => (<MenuItem key={item} value={item}>
                        {item}
                    </MenuItem>))}
            </Select>
        </FormControl>);
}
