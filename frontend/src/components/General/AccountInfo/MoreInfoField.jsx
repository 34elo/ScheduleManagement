export default function MoreInfoField({age, contact, username, code}) {
    console.log(code)
    return (
        <>
            <h6 style={{margin: '2px', marginTop: '20px', fontStyle: 'italic', fontSize: '16px'}}>Информация</h6>
            <p>Контактный телефон: {contact}</p>
            <p>Телеграм: {username}</p>
            <p>Возраст: {age}</p>
            {code ? <p>Код для входа: {code}</p> : null}
        </>
    )
}