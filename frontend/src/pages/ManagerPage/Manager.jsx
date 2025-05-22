import {useState} from "react";
import {Button, Modal, Tab} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ScheduleMenu from "../../components/General/ScheduleMenu/ScheduleMenu.jsx";
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
        transition: 'all 0.3s ease',
        opacity: 0.8,
        textAlign: 'center',
        minWidth: '100px',
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 500,
        fontSize: '0.9rem',
        letterSpacing: '0.5px',
        '&.Mui-selected': {
            background: 'linear-gradient(135deg, #0571ff, #05bfff)',
            color: 'white',
            borderRadius: "12px",
            opacity: 1,
            boxShadow: '0 2px 6px rgba(5, 113, 255, 0.3)',
            fontWeight: 600
        },
        '&:last-child': {
            background: 'linear-gradient(135deg, #ff7105, #ff9e05)',
            color: 'white',
            borderRadius: "12px",
            opacity: 1,
            boxShadow: '0 2px 6px rgba(255, 113, 5, 0.3)'
        },
        '&:hover': {
            opacity: 1,
            transform: 'translateY(-2px)'
        }
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
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom, #f8faff, #ffffff)',
            fontFamily: "'Roboto', sans-serif"
        }}>
            <Box sx={{width: '100%', maxWidth: '1280px', display: 'flex', flexDirection: 'column', height: '100%'}}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 24px',
                    backgroundColor: 'white',
                    borderRadius: '14px',
                    boxShadow: '0 4px 12px rgba(5, 113, 255, 0.08)',
                    margin: '10px',
                    '@media (max-width: 768px)': {
                        display: 'none'
                    }
                }}>
                    <h3 style={{
                        margin: 0,
                        color: '#0571ff',
                        fontFamily: "'Roboto', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.4rem',
                        letterSpacing: '0.5px',
                        textShadow: '0 2px 4px rgba(5, 113, 255, 0.1)'
                    }}>ГрафикУм</h3>
                    <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="transparent"
                            sx={stylesTabList}
                        >
                            <Tab label="Расписание" value="1" style={{
                                marginRight: '15px',
                                color: '#2a4365',
                                fontWeight: 500
                            }}/>
                            <Tab label="Отчёты" value="2" style={{
                                marginRight: '15px',
                                color: '#2a4365',
                                fontWeight: 500
                            }}/>
                            <Tab label="Сотрудники" value="3" style={{
                                marginRight: '15px',
                                color: '#2a4365',
                                fontWeight: 500
                            }}/>
                            <Tab label="Личный кабинет" value="4" style={{color: '#2a4365'}}/>
                        </TabList>
                    </TabContext>
                </Box>
                <Box sx={{
                    flex: 1,
                    padding: '20px',
                    paddingBottom: '60px',
                    overflowY: 'auto',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: '14px',
                    margin: '0 10px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}>
                    <TabContext value={value}>

                        <TabPanel value="1" style={{padding: 0}}>
                            <ScheduleMenu admin={true}/>
                        </TabPanel>

                        <TabPanel value="2" style={{padding: 0}}>
                            <ReportsMenu/>
                        </TabPanel>

                        <TabPanel value="3" style={{padding: 0}}>
                            <EmployeesManagerMenu/>
                        </TabPanel>

                        <TabPanel value="4" style={{padding: 0}}>
                            <AccountInfo name='name' label='Личный кабинет' role='Администратор' lc={true}>
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <ModalEditAccount setOpen={setOpen}></ModalEditAccount>
                                </Modal>
                                <Button variant='contained'
                                        style={{
                                            background: 'linear-gradient(135deg, #0571ff, #05bfff)',
                                            borderRadius: '12px',
                                            width: '30%',
                                            color: 'white',
                                            fontWeight: 500,
                                            letterSpacing: '0.5px',
                                            padding: '8px 16px',
                                            boxShadow: '0 2px 6px rgba(5, 113, 255, 0.3)',
                                            textTransform: 'none',
                                            fontSize: '0.9rem'
                                        }}
                                        onClick={() => setOpen(true)}>
                                    Редактировать
                                </Button>
                                <LogoutButton></LogoutButton>
                            </AccountInfo>
                        </TabPanel>
                    </TabContext>
                </Box>
                <Box sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '12px 0',
                    boxShadow: '0px -4px 12px rgba(5, 113, 255, 0.08)',
                    display: 'none',
                    '@media (max-width: 768px)': {
                        display: 'flex',
                        justifyContent: 'center'
                    }
                }}>
                    <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="transparent"
                            centered
                            sx={{
                                ...stylesTabList,
                                '& .MuiTab-root': {
                                    fontSize: '0.7rem',
                                    minWidth: '60px',
                                    color: '#2a4365',
                                    margin: '0 5px'
                                }
                            }}
                        >
                            <Tab label="Расписание" value="1" title="Расписание"/>
                            <Tab label="Отчеты" value="2" title="Отчеты"/>
                            <Tab label="Сотрудники" value="3" title="Сотрудники"/>
                            <Tab label="Кабинет" value="4" title="Личный кабинет"/>
                        </TabList>
                    </TabContext>
                </Box>
            </Box>
        </Box>
    );
}