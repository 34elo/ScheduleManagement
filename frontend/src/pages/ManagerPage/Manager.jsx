import {useState} from "react";
import {Button, Modal, Tab} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ScheduleMenu from "../../components/Manager/ScheduleMenu/ScheduleMenu.jsx";
import EmployeesManagerMenu from "../../components/Manager/EmployeesMenu/EmployeesManagerMenu.jsx";
import ReportsMenu from "../../components/Manager/ReportsMenu/ReportsMenu.jsx";
import AccountInfo from "../../components/General/AccountInfo/AccountInfo.jsx";
import LogoutButton from "../../components/General/LogoutButton/LogoutButton.jsx";
import ModalEditAccount from "../../components/General/AccountInfo/ModalEditAccount.jsx";

const stylesTabList = {
    display: 'flex',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    '& .MuiTab-root': {
        backgroundColor: 'transparent',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: 0.7,
        textAlign: 'center',
        minWidth: '100px',
        '&.Mui-selected': {
            backgroundColor: '#c1c1c1',
            color: 'black',
            borderRadius: "15px",
            opacity: 1,
        },
        '&:last-child': {
            backgroundColor: 'black',
            color: 'white',
            borderRadius: "15px",
            opacity: 1,
        },
    },
    '@media (max-width: 768px)': {
        justifyContent: 'space-around',
        width: '100%',
    }
};

export default function ManagerPage() {
    const [value, setValue] = useState("1");
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);

    function handleChange(e, newValue) {
        setValue(newValue);
    }

    function handleEdit() {
        setIsEditing(prev => !prev);
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', height: '100vh'}}>
            <Box sx={{width: '100%', maxWidth: '1280px', display: 'flex', flexDirection: 'column', height: '100%'}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    backgroundColor: '#f1f1f1',
                    borderRadius: '10px',
                    '@media (max-width: 768px)': {
                        display: 'none'
                    }
                }}>
                    <h3 style={{margin: 0}}>Manager Menu</h3>
                    <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="transparent"
                            sx={stylesTabList}
                        >
                            <Tab label="Расписание" value="1"/>
                            <Tab label="Отчеты" value="2"/>
                            <Tab label="Сотрудники" value="3"/>
                            <Tab label="Личный кабинет" value="4"/>
                        </TabList>
                    </TabContext>
                </Box>
                <Box sx={{flex: 1, padding: '20px', paddingBottom: '60px', overflowY: 'auto', alignItems: 'center'}}>
                    <TabContext value={value}>

                        <TabPanel value="1" style={{padding: 0}}>
                            <ScheduleMenu/>
                        </TabPanel>

                        <TabPanel value="2" style={{padding: 0}}>
                            <ReportsMenu />
                        </TabPanel>

                        <TabPanel value="3" style={{padding: 0}}>
                            <EmployeesManagerMenu/>
                        </TabPanel>

                        <TabPanel value="4" style={{padding: 0}}>
                            <AccountInfo name='name' label='Личный кабинет'>
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <ModalEditAccount setOpen={setOpen}></ModalEditAccount>
                                </Modal>
                                <Button variant='contained'
                                        style={{marginTop: '10px', backgroundColor: 'black', color: 'white', borderRadius: '10px'}}
                                        onClick={() => setOpen(true)}>
                                    Редактировать
                                </Button>
                                <LogoutButton></LogoutButton>
                            </AccountInfo>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Box>
    );
}
