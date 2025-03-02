import {FormControlLabel, IconButton, Modal, Switch, Tab} from "@mui/material";
import {useState} from "react";
import TabPanel from "@mui/lab/TabPanel";
import {Box} from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import EditIcon from '@mui/icons-material/Edit';
import ModalEditSchedule from "./ModalEditSchedule.jsx";
import TableSchedule from "../../General/ScheduleMenu/TableSchedule.jsx";

const tabsData = [
    {
        id: '1',
        name: 'Point 1',
        info: {
            address: 'Address 1',
            city: 'City 1',
            state: 'State 1',
        }
    },
    {
        id: '2',
        name: 'Point 2',
        info: {
            address: 'Address 2',
            city: 'City 2',
            state: 'State 2',
        }
    },
    {
        id: '3',
        name: 'Point 3',
        info: {
            address: 'Address 3',
            city: 'City 3',
            state: 'State 3',
        }
    }
];

const styleBox = {

    minHeight: '500px',
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',

    '& .MuiTab-root': {

        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: 0.6,
        transform: 'scale(0.95)',

        '&.Mui-selected': {
            backgroundColor: '#c1c1c1',
            color: 'black',
            borderRadius: "20px",
            opacity: 1,
            transform: 'scale(1)',
        },
    },
}

export default function ScheduleMenuManager() {

    const getTabInfo = () => {
        const selectedTab = tabsData.find(tab => tab.id === value);
        if (selectedTab) {
            return selectedTab.name;
        }
        return null;
    }

    const [value, setValue] = useState(tabsData.length > 0 ? tabsData[0].id : null  );
    const [period, setPeriod] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleChange(e, newValue) {
        setValue(newValue);
    }

    function changePeriod(e, newValue) {
        console.log('change', e, newValue);
        setPeriod(newValue);
    }

    return (
        <>
            <Box sx={{justifyContent: 'space-between', flexGrow: 1, display: 'flex'}}>
                <h1 style={{paddingBottom: '20px', margin: 0}}>{name}
                    Расписание
                    <IconButton aria-label="edit" onClick={handleOpen} sx={{margin: '20px'}}>
                        <EditIcon />
                    </IconButton>
                </h1>

                <FormControlLabel
                    control={<Switch checked={period} onChange={changePeriod} color="transparent" />}
                    label="Расписание на месяц"
                />
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalEditSchedule setOpen={setOpen}></ModalEditSchedule>
            </Modal>
            <Box sx={{flexGrow: 1, backgroundColor: 'white', display: 'flex', height: 224}}>

                <TabContext value={value}>
                    <Box sx={styleBox}>
                        <TabList
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                            orientation="vertical"
                            indicatorColor="transparent"
                            color='transparent'
                            textColor="primary"
                        >
                            {tabsData.map((tab) => (
                                <Tab key={tab.id} label={tab.name} value={tab.id}/>
                            ))}
                        </TabList>
                    </Box>
                    <TabPanel value={value} key={value} sx={{width: '100%', paddingTop: '0px'}}>
                        <Box style={{backgroundColor: '#f0f0f0', minHeight: '500px', borderRadius: '20px', width: '100%', minWidth: '500px'}}>
                            <TableSchedule name={getTabInfo()} period={String(period)}></TableSchedule>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
}