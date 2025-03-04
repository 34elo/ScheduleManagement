import {FormControlLabel, IconButton, Modal, Switch, Tab} from "@mui/material";
import {useEffect, useState} from "react";
import TabPanel from "@mui/lab/TabPanel";
import {Box} from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import EditIcon from '@mui/icons-material/Edit';
import ModalEditSchedule from "../../Manager/ScheduleMenu/ModalEditSchedule.jsx";
import TableSchedule from "./TableSchedule.jsx";
import axios from "axios";

const styleBox = {
    minHeight: '500px', backgroundColor: '#f0f0f0', borderRadius: '20px',
    '& .MuiTab-root': {
        transition: 'opacity 0.3s ease, transform 0.3s ease', opacity: 0.6, transform: 'scale(0.95)',
        '&.Mui-selected': {
            backgroundColor: '#c1c1c1',
            color: 'black',
            borderRadius: "20px",
            opacity: 1,
            transform: 'scale(1)'
        },
    },
};

export default function ScheduleMenu({admin}) {
    const [period, setPeriod] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState([]);  // Инициализируем как пустой массив
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage

                const response = await axios.get(`http://127.0.0.1:8000/api/schedule/?period=${period ? 'month' : 'week'}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Добавляем токен в заголовок запроса
                    }
                });
                setData(response.data.data);  // Устанавливаем полученные данные
                console.log(response.data);
            } catch (err) {
                setError('Ошибка загрузки данных');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [period]);


    const [value, setValue] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            setValue(data[0].id);
        }
    }, [data]);

    function getSchedule() {
        if (data) {
            console.log(data, 'check');
            data.forEach((item) => {
                console.log(item);
                if (item.id === value) {
                    return item;
                }
            })
        } else {
            return false
        }
    }

    function handleChange(e, newValue) {
        setValue(newValue);
    }

    function changePeriod(e, newValue) {
        setPeriod(newValue);
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Box sx={{justifyContent: 'space-between', flexGrow: 1, display: 'flex'}}>
                <h1 style={{paddingBottom: '20px', margin: 0}}>Расписание
                    {admin && <IconButton aria-label="edit" onClick={handleOpen} sx={{margin: '20px'}}>
                        <EditIcon/>
                    </IconButton>}
                </h1>

                <FormControlLabel
                    control={<Switch checked={period} onChange={changePeriod} color="transparent"/>}
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
            <Box sx={{flexGrow: 1, backgroundColor: 'white', display: 'flex', minHeight: 224,}}>
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
                            {/* Проверяем, что data является массивом перед вызовом map */}
                            {Array.isArray(data) && data.map((tab) => (
                                <Tab key={tab.id} label={tab.point} value={tab.id}/>
                            ))}
                        </TabList>
                    </Box>
                    <TabPanel value={value} sx={{width: '100%', paddingTop: '0px'}}>
                        <Box style={{
                            backgroundColor: '#f0f0f0',
                            minHeight: '500px',
                            borderRadius: '20px',
                            width: '100%',
                            minWidth: '500px'
                        }}>
                            <TableSchedule data={getSchedule()}/>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </>
    );
}
