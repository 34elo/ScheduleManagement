import {Box} from "@mui/system";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import SelectAny from "./SelectAny.jsx";
import Paragraph from "../../Manager/UtilsComponents/Paragraph.jsx";
import axios from "axios";


export default function MyWishes(props) {

    const [selectedAddress, setSelectedAddress] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const [address, setAddress] = useState();
    const [days, setDay] = useState();

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/points/', {headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Добавляем токен в заголовок запроса
                }})
                setAddresses(response.data);
                console.log(response.data);
            }catch(err) {
                    console.log(err);
                }
                }
        fetchData();
    }, [])

    function handleChange() {
        setSelectedAddress([]);
        setSelectedDays([]);
        axios.patch('http://127.0.0.1:8000/api/employee/wishes/', {
            days: selectedDays,
            points: selectedAddress,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }
        }).then(r => console.log(r))
    }

    return (<>
        <Box sx={{
            display: 'flex', // Используем Flexbox
            flexDirection: 'column', // Располагаем элементы друг под другом
            alignItems: 'center', // Центрируем по горизонтали
            justifyContent: 'center', // Центрируем по вертикали

        }}>
            <h2 style={{margin: 0, marginTop: '10px'}}>Моя информация</h2>
            <Paragraph>Мои желаемые адреса: {address}</Paragraph>
            <Paragraph>Мои желаемые дни: {days}</Paragraph>
            <h2 style={{margin: 0, marginTop: '10px'}}>Хотите изменить?</h2>

            <SelectAny setSelected={setSelectedAddress} MyArray={addresses} label='Адрес'
                       selectAnything={selectedAddress}></SelectAny>
            <SelectAny setSelected={setSelectedDays} MyArray={['ПН', 'ВТ', "СР", "ЧТ", "ПТ", "СБ", "ВС"]}
                       selectAnything={selectedDays} label='День'></SelectAny>
            <Button variant="contained" onClick={handleChange} sx={{backgroundColor: '#c1c1c1'}}>
                Изменить
            </Button>
        </Box>
    </>)
}