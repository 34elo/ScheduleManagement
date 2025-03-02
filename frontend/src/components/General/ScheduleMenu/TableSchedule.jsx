import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const data = [
    {date: '20.03.2025', employees: ['Petr', 'Vasya']},
    {date: '21.03.2025', employees: ['Kolya', 'Dasha']},
    {date: '21.03.2025', employees: ['Kolya', 'Dasha']},
    {date: '21.03.2025', employees: ['Kolya', 'Dasha']},
    {date: '21.03.2025', employees: ['Kolya', 'Dasha']},
    {date: '21.03.2025', employees: ['Kolya', 'Dasha']},
    {date: '21.03.2025', employees: ['Kolya', 'Dasha']}
]

// eslint-disable-next-line react/prop-types
export default function TableSchedule({name, period}) {
    console.log(name, period)
    return (
        <>
            <TableContainer component={Paper}
                            sx={{boxShadow: 'none', minWidth: 500, backgroundColor: '#f0f0f0', borderRadius: '20px', maxHeight: '500px'}}>
                <Table
                    aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{textAlign: 'center', maxWidth: '1px'}}>Даты</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>Сотрудники</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell sx={{textAlign: 'center', maxWidth: '1px'}}>{row.date}</TableCell>
                                <TableCell sx={{textAlign: 'center'}}>{row.employees.join(', ')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h1>{name} {period}</h1>
    </>)}