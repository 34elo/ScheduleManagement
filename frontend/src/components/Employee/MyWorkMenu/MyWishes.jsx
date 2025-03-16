import {Box} from "@mui/system";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";
import SelectAny from "./SelectAny.jsx";
import Paragraph from "../../Manager/UtilsComponents/Paragraph.jsx";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";


export default function MyWishes(props) {

    const [selectedAddress, setSelectedAddress] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const [address, setAddress] = useState([]);
    const [days, setDays] = useState([]);

    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/employee/wishes/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        ContentType: "application/json"
                    }
                });
                console.log(response);
                setAddress(response.data.address)
                setDays(response.data.days);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/points/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Добавляем токен в заголовок запроса
                    }
                })
                const r = response.data
                setAddresses(r);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])

    function handleChange() {
        setSelectedAddress([]);
        setSelectedDays([]);
        axios.patch(`${API_URL}/employee/wishes/`, {
            days: selectedDays, points: selectedAddress,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json"
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
            <h4 style={{margin: '2px'}}>Мои желаемые адреса:</h4>
            <p style={{margin: '2px'}}>{address.join(', ')}</p>
            <h4 style={{margin: '2px'}}>Мои желаемые дни:</h4>
            <p style={{margin: '2px'}}>{days.join(', ')}</p>
            <h2 style={{margin: '10px', marginTop: '10px'}}>Хотите изменить?</h2>

            <SelectAny setSelected={setSelectedAddress} MyArray={addresses} label='Адрес'
                       selectAnything={selectedAddress}></SelectAny>
            <SelectAny setSelected={setSelectedDays}
                       MyArray={['ПН', 'ВТ', "СР", "ЧТ", "ПТ", "СБ", "ВС"]}
                       selectAnything={selectedDays} label='День'></SelectAny>
            <Button variant="contained" onClick={handleChange} sx={{marginTop: '10px', backgroundColor: 'black', color: 'white', borderRadius: '25px'}}>
                Изменить
            </Button>
        </Box>
    </>)
}