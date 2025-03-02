import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const data = [{date: '20.03.2025', point: 'Гагарина 3'}, {date: '21.03.2025', point: 'Гагарина 3'}, {
    date: '21.03.2025', point: 'Гагарина 3'
}, {date: '21.03.2025', point: 'Гагарина 3'}, {date: '21.03.2025', point: 'Гагарина 3'}, {
    date: '21.03.2025', point: 'Гагарина 3'
}, {date: '21.03.2025', point: 'Гагарина 3'},]

// eslint-disable-next-line react/prop-types
export default function MySchedule({name}) {
    console.log(name)
    return (<>
        <TableContainer component={Paper}
                        sx={{
                            boxShadow: 'none',
                            minWidth: 500,
                            backgroundColor: '#f0f0f0',
                            borderRadius: '20px',
                            maxHeight: '450px'
                        }}>
            <Table
                aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{textAlign: 'center', maxWidth: '1px'}}>Дата</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>Адрес</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (<TableRow key={index}>
                        <TableCell sx={{textAlign: 'center', maxWidth: '1px'}}>{row.date}</TableCell>
                        <TableCell sx={{textAlign: 'center'}}>{row.point}</TableCell>
                    </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer>
        <h1>{name}</h1>
    </>)
}