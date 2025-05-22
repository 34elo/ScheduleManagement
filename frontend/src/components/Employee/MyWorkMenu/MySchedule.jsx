import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box
} from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../API_URL.js";

export default function MySchedule({ name }) {
    const [scheduleData, setScheduleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/employee/schedule/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Преобразуем объект в массив для удобства работы
                const formattedData = Object.entries(response.data).map(([date, point]) => ({
                    date,
                    point
                }));
                setScheduleData(formattedData);
            } catch (err) {
                setError('Не удалось загрузить расписание');
                console.error("Ошибка загрузки расписания:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px'
            }}>
                <CircularProgress size={60} thickness={4} sx={{ color: '#0571ff' }} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
                color: 'error.main'
            }}>
                <Typography variant="h6">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Typography variant="h4" gutterBottom sx={{
                color: '#2a4365',
                fontWeight: 600,
                mb: 3,
                textAlign: 'center'
            }}>
                Мое расписание
            </Typography>

            {scheduleData.length > 0 ? (
                <TableContainer
                    component={Paper}
                    sx={{
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(5, 113, 255, 0.1)',
                        maxHeight: '450px',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '6px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(5, 113, 255, 0.3)',
                            borderRadius: '3px'
                        }
                    }}
                >
                    <Table stickyHeader aria-label="employee schedule">
                        <TableHead>
                            <TableRow sx={{
                                '& th': {
                                    backgroundColor: '#f8faff',
                                    fontWeight: 600,
                                    color: '#2a4365'
                                }
                            }}>
                                <TableCell sx={{
                                    minWidth: 120,
                                    borderRight: '1px solid rgba(224, 224, 224, 0.5)'
                                }}>
                                    Дата
                                </TableCell>
                                <TableCell>Адрес</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {scheduleData.map((item, index) => (
                                <TableRow
                                    key={index}
                                    hover
                                    sx={{
                                        '&:nth-of-type(even)': {
                                            backgroundColor: 'rgba(5, 113, 255, 0.03)'
                                        },
                                        '&:last-child td': {
                                            borderBottom: 0
                                        }
                                    }}
                                >
                                    <TableCell sx={{
                                        fontWeight: 500,
                                        borderRight: '1px solid rgba(224, 224, 224, 0.5)'
                                    }}>
                                        {item.date}
                                    </TableCell>
                                    <TableCell>{item.point}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px',
                    backgroundColor: 'rgba(5, 113, 255, 0.05)',
                    borderRadius: '12px'
                }}>
                    <Typography variant="h6" color="textSecondary">
                        Расписание отсутствует
                    </Typography>
                </Box>
            )}
        </Box>
    );
}