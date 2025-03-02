import {useState} from "react";
import Paragraph from "../../Manager/UtilsComponents/Paragraph.jsx";

export default function MoreInfoField({name}) {

    function getInfo() {
        return {
            name: 'name',
            role: 'role',
            number: '+7 91234523423',
            tg: '@username'

        }
    }
    const [info, setInfo] = useState(getInfo())

    return (
        <>
            <h2 style={{margin: '2px'}}>Контакты</h2>
            <Paragraph>Телефон: {info.number}</Paragraph>
            <Paragraph>Телеграм: {info.tg}</Paragraph>

        </>
    )
}