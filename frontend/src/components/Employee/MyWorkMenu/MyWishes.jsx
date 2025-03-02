import {Box} from "@mui/system";
import {Button} from "@mui/material";
import {useState} from "react";
import SelectAny from "./SelectAny.jsx";
import Paragraph from "../../Manager/UtilsComponents/Paragraph.jsx";

const addresssss = ['Popova', 'Gagarina', 'Lenin street']


export default function MyWishes(props) {

    const [selectedAddress, setSelectedAddress] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const [address, setAddress] = useState(["Гагарина"]);
    const [days, setDay] = useState(['ВТ']);

    function handleChange(event) {
        console.log(selectedDays, selectedAddress);
        setSelectedAddress([]);
        setSelectedDays([]);
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

            <SelectAny setSelected={setSelectedAddress} MyArray={addresssss} label='Адрес'
                       selectAnything={selectedAddress}></SelectAny>
            <SelectAny setSelected={setSelectedDays} MyArray={['ПН', 'ВТ', "СР", "ЧТ", "ПТ", "СБ", "ВС"]}
                       selectAnything={selectedDays} label='День'></SelectAny>
            <Button variant="contained" onClick={handleChange} sx={{backgroundColor: '#c1c1c1'}}>
                Изменить
            </Button>
        </Box>
    </>)
}