export default function NameField({name}) {

    function getRole() {
        return (
            <>
                role
            </>
        )
    }

    return (
        <>
            <h1 style={{margin: '2px'}}>{name}</h1>
            <p style={{color: 'gray', margin: '2px' }}>
                {getRole()}
            </p>
        </>
    )
}