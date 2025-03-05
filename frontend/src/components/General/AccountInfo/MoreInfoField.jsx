export default function MoreInfoField({age, contact, username}) {

    return (
        <>
            <h6 style={{margin: '2px', marginTop: '20px', fontStyle: 'italic', fontSize: '16px'}}>Информация</h6>
            <p>Контактный телефон: {contact}</p>
            <p>Телеграм: {username}</p>
            <p>Возраст: {age}</p>
        </>
    )
}