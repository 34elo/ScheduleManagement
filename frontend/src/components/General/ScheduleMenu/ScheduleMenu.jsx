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
    minHeight: '500px', backgroundColor: '#f0f0f0', borderRadius: '20px', '& .MuiTab-root': {
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        opacity: 0.6,
        transform: 'scale(0.95)',
        color: 'black',
        overflow: 'scroll',
        '&.Mui-selected': {
            backgroundColor: '#c1c1c1', borderRadius: "20px", opacity: 1, transform: 'scale(1)'
        },
    },
};

export default function ScheduleMenu({admin}) {
    const [period, setPeriod] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState([]);  // Инициализируем как пустой массив
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState([{date: 'Данные отсутсвуют', employees: ['Данные отсутсвуют']},]);
    const [selectedPoint, setSelectedPoint] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage

                const response = await axios.get(`${API_URL}/schedule/?period=${period ? 'month' : 'week'}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Добавляем токен в заголовок запроса
                    }
                });
                setData(response.data.data);  // Устанавливаем полученные данные
            } catch (err) {
                setError('Ошибка загрузки данных');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [period]);


    const [value, setValue] = useState(0); // Начальное значение пустая строка

    useEffect(() => {
        if (data.length > 0) {
            setValue(data[0].id);
        }
    }, [data]);

    useEffect(() => {
        if (data.length > 0) {
            const selectedData = data.find(item => item.id === value);
            setSelected(selectedData ? selectedData.schedule : [{
                date: 'Данные отсутсвуют', employees: ['Данные отсутсвуют']
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

    function handleButton() {
        const response = axios.put(`${API_URL}/admin/schedule/generating`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    return (<>
        <Box sx={{justifyContent: 'space-between', flexGrow: 1, display: 'flex', overflow: 'scroll'}}>
            <h1 style={{paddingBottom: '20px', margin: 0}}>Расписание
                {admin && <Button variant="contained" onClick={handleButton}
                                  sx={{
                                      marginLeft: '25px',
                                      borderRadius: '25px',
                                      backgroundColor: "black",
                                      color: "white"
                                  }}>
                    Сформировать
                </Button>}
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
            <ModalEditSchedule setOpen={setOpen} selectedPoint={selectedPoint}></ModalEditSchedule>
        </Modal>
        <Box sx={{flexGrow: 1, backgroundColor: 'white', display: 'flex', minHeight: 224, overflow: 'scroll'}}>
            <TabContext value={value}>
                <Box sx={styleBox}>
                    <TabList
                        onChange={handleChange}
                        orientation="vertical"
                        indicatorColor="transparent"
                        color='transparent'
                        textColor="primary"
                        style={{maxWidth: '270px', height: '600px', overflow: 'auto'}}
                    >
                        {Array.isArray(data) && data.map((tab) => (
                            <Tab key={tab.id}
                                 label={(tab.point === selectedPoint) && (admin) ?
                                     <div style={{
                                         display: "flex",
                                         direction: 'row',
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         color: 'black',
                                         overflow: 'hidden'
                                     }}>
                                         {tab.point.replace('_', ' ')}
                                         <IconButton
                                             aria-label="edit" onClick={handleOpen}
                                             sx={{marginLeft: '10px', maxHeight: '22px', maxWidth: '22px'}}>
                                             <EditIcon/>
                                         </IconButton>
                                     </div>
                                     :
                                     tab.point.replace('_', ' ')}
                                 value={tab.id}/>))}
                    </TabList>
                </Box>
                <TabPanel value={value} sx={{padding: 0, width: '100%', paddingLeft: '20px'}}>
                    <Box style={{
                        backgroundColor: '#f0f0f0',
                        minHeight: '500px',
                        borderRadius: '20px',
                        width: '100%',
                        minWidth: '500px'
                    }}>
                        <TableSchedule data={selected}/>
                    </Box>

                </TabPanel>
            </TabContext>
        </Box>
    </>);
}
