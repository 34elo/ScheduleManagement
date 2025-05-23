import {Button, FormControlLabel, IconButton, Modal, Switch, Tab} from "@mui/material";
import {useEffect, useState} from "react";
import TabPanel from "@mui/lab/TabPanel";
import {Box} from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import ModalEditSchedule from "../../Manager/ScheduleMenu/ModalEditSchedule.jsx";
import TableSchedule from "./TableSchedule.jsx";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";
import EditIcon from '@mui/icons-material/Edit';

const styleBox = {
    minHeight: '500px',
    backgroundColor: 'rgba(5, 113, 255, 0.05)',
    borderRadius: '16px',
    border: '1px solid rgba(5, 113, 255, 0.1)',
    '& .MuiTab-root': {
        transition: 'all 0.3s ease',
        opacity: 0.8,
        color: '#2a4365',
        fontSize: '0.9rem',
        fontWeight: 500,
        padding: '12px 16px',
        minHeight: '48px',
        '&.Mui-selected': {
            backgroundColor: 'rgba(5, 113, 255, 0.1)',
            borderRadius: "12px",
            opacity: 1,
            color: '#0571ff',
            fontWeight: 600,
            borderLeft: '3px solid #0571ff'
        },
        '&:hover': {
            backgroundColor: 'rgba(5, 113, 255, 0.05)'
        }
    },
};

export default function ScheduleMenu({admin}) {
    const [period, setPeriod] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState([{date: 'Данные отсутствуют', employees: ['Данные отсутствуют']}]);
    const [selectedPoint, setSelectedPoint] = useState();
    const [isClearing, setIsClearing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/schedule/?period=${period ? 'month' : 'week'}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data.data);
            } catch (err) {
                setError('Ошибка загрузки данных');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [period]);

    const [value, setValue] = useState(0);

    useEffect(() => {
        if (data.length > 0) {
            setValue(data[0].id);
        }
    }, [data]);

    useEffect(() => {
        if (data.length > 0) {
            const selectedData = data.find(item => item.id === value);
            setSelected(selectedData ? selectedData.schedule : [{
                date: 'Данные отсутствуют',
                employees: ['Данные отсутствуют']
            }]);
            setSelectedPoint(selectedData ? selectedData.point : null)
        }
    }, [value, data, period]);

    function handleChange(e, newValue) {
        setValue(newValue);
    }

    function changePeriod(e, newValue) {
        setPeriod(newValue);
    }

    async function handleGenerate() {
        const response =  await axios.put(`${API_URL}/admin/schedule/generating`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        if (response) {
            window.location.reload()
        }
    }

    async function handleClearSchedule() {
        setIsClearing(true);
        try {
            const response = await axios.delete(`${API_URL}/schedule`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'accept': 'application/json'
                }
            });
            console.log(response);
            // Обновляем данные после очистки
            const refreshResponse = await axios.get(`${API_URL}/schedule/?period=${period ? 'month' : 'week'}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setData(refreshResponse.data.data);
        } catch (err) {
            console.error('Ошибка при очистке расписания:', err);
            setError('Ошибка при очистке расписания');
        } finally {
            setIsClearing(false);
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Box sx={{
                justifyContent: 'space-between',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px'
            }}>
                <h1 style={{
                    paddingBottom: '0',
                    margin: 0,
                    color: '#0571ff',
                    fontSize: '1.8rem',
                    fontWeight: 600
                }}>
                    Расписание
                    {admin &&
                        <Box sx={{ display: 'inline-flex', gap: '12px', marginLeft: '20px' }}>
                            <Button
                                variant="contained"
                                onClick={handleGenerate}
                                sx={{
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #0571ff, #05bfff)',
                                    color: 'white',
                                    fontWeight: 500,
                                    padding: '8px 20px',
                                    textTransform: 'none',
                                    boxShadow: '0 2px 8px rgba(5, 113, 255, 0.2)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #0465e0, #04aae0)'
                                    }
                                }}
                            >
                                Сформировать
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleClearSchedule}
                                disabled={isClearing}
                                sx={{
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #ff7105, #ff9e05)',
                                    color: 'white',
                                    fontWeight: 500,
                                    padding: '8px 20px',
                                    textTransform: 'none',
                                    boxShadow: '0 2px 8px rgba(255, 113, 5, 0.2)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #e56604, #e58d04)'
                                    },
                                    '&:disabled': {
                                        opacity: 0.7
                                    }
                                }}
                            >
                                {isClearing ? 'Очистка...' : 'Очистить'}
                            </Button>
                        </Box>
                    }
                </h1>

                <FormControlLabel
                    control={
                        <Switch
                            checked={period}
                            onChange={changePeriod}
                            sx={{
                                '& .MuiSwitch-thumb': {
                                    backgroundColor: period ? '#ff7105' : '#0571ff'
                                },
                                '& .MuiSwitch-track': {
                                    backgroundColor: period ? 'rgba(255, 113, 5, 0.3)' : 'rgba(5, 113, 255, 0.3)'
                                }
                            }}
                        />
                    }
                    label="Расписание на месяц"
                    sx={{
                        '& .MuiTypography-root': {
                            fontWeight: 500,
                            color: '#2a4365'
                        }
                    }}
                />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalEditSchedule setOpen={setOpen} selectedPoint={selectedPoint} />
            </Modal>

            <Box sx={{
                flexGrow: 1,
                backgroundColor: 'white',
                display: 'flex',
                minHeight: 224,
                borderRadius: '16px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
            }}>
                <TabContext value={value}>
                    <Box sx={styleBox}>
                        <TabList
                            onChange={handleChange}
                            orientation="vertical"
                            indicatorColor="transparent"
                            textColor="primary"
                            sx={{
                                width: '270px',
                                height: '600px',
                                padding: '8px',
                                '&::-webkit-scrollbar': {
                                    width: '6px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: 'rgba(5, 113, 255, 0.2)',
                                    borderRadius: '3px'
                                }
                            }}
                        >
                            {Array.isArray(data) && data.map((tab) => (
                                <Tab
                                    key={tab.id}
                                    label={(tab.point === selectedPoint) && (admin) ?
                                        <Box sx={{
                                            display: "flex",
                                            direction: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%',
                                            paddingRight: '8px'
                                        }}>
                                            {tab.point.replace('_', ' ')}
                                            <IconButton
                                                aria-label="edit"
                                                onClick={handleOpen}
                                                sx={{
                                                    marginLeft: '10px',
                                                    color: '#0571ff',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(5, 113, 255, 0.1)'
                                                    }
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                        :
                                        tab.point.replace('_', ' ')}
                                    value={tab.id}
                                />
                            ))}
                        </TabList>
                    </Box>

                    <TabPanel value={value} sx={{
                        padding: 0,
                        width: '100%',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}>
                        <Box>
                            <TableSchedule data={selected} />
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
}