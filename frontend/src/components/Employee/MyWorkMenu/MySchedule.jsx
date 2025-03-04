import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../../../API_URL.js";

export default function MySchedule({ name }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token'); // Получаем токен из localStorage

                const response = await axios.get(`${API_URL}/employee/schedule/`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Добавляем токен в заголовок запроса
                    }
                });
                setData(response.data);  // Устанавливаем полученные данные
            } catch (err) {
                setError('Ошибка загрузки данных');
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <TableContainer component={Paper}
                            sx={{
                                boxShadow: 'none',
                                minWidth: 500,
                                backgroundColor: '#f0f0f0',
                                borderRadius: '20px',
                                maxHeight: '450px'
                            }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'center', maxWidth: '1px' }}>Дата</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>Адрес</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(data).map(([date, point], index) => (
                            <TableRow key={index}>
                                <TableCell sx={{ textAlign: 'center', maxWidth: '1px' }}>{date}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{point}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h1>{name}</h1>
        </>
    );
}
