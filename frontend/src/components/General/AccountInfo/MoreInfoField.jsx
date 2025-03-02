export default function MoreInfoField({age, contact, username}) {

    return (
        <>
            <h2 style={{margin: '2px'}}>Информация</h2>
            <p>Контактный телефон: {contact}</p>
            <p>Телеграм: {username}</p>
            <p>Возраст: {age}</p>
        </>
    )
}