import { useState } from "react";
import {Button, Modal, Tab, Typography} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import MyWorkMenu from "../../components/Employee/MyWorkMenu/MyWorkMenu.jsx";
import AdminsMenu from "../../components/Employee/AdminsMenu/AdminsMenu.jsx";
import AccountInfo from "../../components/General/AccountInfo/AccountInfo.jsx";
import ModalEditAccount from "../../components/General/AccountInfo/ModalEditAccount.jsx";
import LogoutButton from "../../components/General/LogoutButton/LogoutButton.jsx";
import ScheduleMenu from "../../components/General/ScheduleMenu/ScheduleMenu.jsx";

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
        margin: '0 8px',
        color: '#2a4365',
        fontWeight: 500,
        '&.Mui-selected': {
            background: 'linear-gradient(135deg, #0571ff, #05bfff)',
            color: 'white',
            borderRadius: "12px",
            opacity: 1,
            boxShadow: '0 2px 8px rgba(5, 113, 255, 0.2)',
            fontWeight: 600
        },
        '&:last-child': {
            background: 'linear-gradient(135deg, #ff7105, #ff9e05)',
            color: 'white',
            borderRadius: "12px",
            opacity: 1,
            boxShadow: '0 2px 8px rgba(255, 113, 5, 0.2)'
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

export default function Employee() {
    const [value, setValue] = useState("1");
    const [open, setOpen] = useState(false);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom, #f8faff, #ffffff)'
        }}>
            <Box sx={{
                width: '100%',
                maxWidth: '1280px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                {/* Верхняя панель навигации */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 24px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(5, 113, 255, 0.1)',
                    margin: '10px',
                    '@media (max-width: 768px)': {
                        display: 'none'
                    }
                }}>
                    <Typography variant="h6" sx={{ color: '#0571ff', fontWeight: 700 }}>
                        ГрафикУм
                    </Typography>
                    <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="transparent"
                            sx={stylesTabList}
                        >
                            <Tab label="Расписание" value="1" />
                            <Tab label="Моя работа" value="2" />
                            <Tab label="Администраторы" value="3" />
                            <Tab label="Личный кабинет" value="4" />
                        </TabList>
                    </TabContext>
                </Box>

                {/* Основное содержимое */}
                <Box sx={{
                    flex: 1,
                    padding: '20px',
                    paddingBottom: '60px',
                    overflowY: 'auto',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    margin: '0 10px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}>
                    <TabContext value={value}>
                        <TabPanel value="1" sx={{ p: 0 }}>
                            <ScheduleMenu admin={false} />
                        </TabPanel>

                        <TabPanel value="2" sx={{ p: 0 }}>
                            <MyWorkMenu height='500px' />
                        </TabPanel>

                        <TabPanel value="3" sx={{ p: 0 }}>
                            <AdminsMenu />
                        </TabPanel>

                        <TabPanel value="4" sx={{ p: 0 }}>
                            <AccountInfo name='name' label='Личный кабинет' lc={true}>
                                <Modal
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <ModalEditAccount setOpen={setOpen} />
                                </Modal>
                                <Button
                                    variant='contained'
                                    onClick={() => setOpen(true)}
                                    sx={{
                                        mt: 2,
                                        backgroundColor: '#0571ff',
                                        color: 'white',
                                        borderRadius: '8px',
                                        width: '200px',
                                        '&:hover': {
                                            backgroundColor: '#0460d6'
                                        }
                                    }}
                                >
                                    Редактировать
                                </Button>
                                <LogoutButton />
                            </AccountInfo>
                        </TabPanel>
                    </TabContext>
                </Box>

                {/* Мобильная навигация */}
                <Box sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    padding: '12px 0',
                    boxShadow: '0px -4px 12px rgba(5, 113, 255, 0.1)',
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
                                    margin: '0 4px',
                                    py: 1
                                }
                            }}
                        >
                            <Tab icon="📅" value="1" title="Расписание" />
                            <Tab icon="💼" value="2" title="Моя работа" />
                            <Tab icon="👔" value="3" title="Администраторы" />
                            <Tab icon="👤" value="4" title="Кабинет" />
                        </TabList>
                    </TabContext>
                </Box>
            </Box>
        </Box>
    );
}