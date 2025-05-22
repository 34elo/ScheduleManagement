import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";

export default function TableSchedule({ data }) {
    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: '0 2px 12px rgba(5, 113, 255, 0.08)',
                minWidth: '300px',
                backgroundColor: 'white',
                borderRadius: '12px',
                height: '600px',
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    width: '6px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(5, 113, 255, 0.2)',
                    borderRadius: '3px'
                }
            }}
        >
            <Table aria-label="schedule table" sx={{ minWidth: 300 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(5, 113, 255, 0.05)' }}>
                        <TableCell
                            sx={{
                                textAlign: 'center',
                                fontWeight: 600,
                                color: '#0571ff',
                                fontSize: '0.95rem',
                                borderBottom: '1px solid rgba(5, 113, 255, 0.1)'
                            }}
                        >
                            Даты
                        </TableCell>
                        <TableCell
                            sx={{
                                textAlign: 'center',
                                fontWeight: 600,
                                color: '#0571ff',
                                fontSize: '0.95rem',
                                borderBottom: '1px solid rgba(5, 113, 255, 0.1)'
                            }}
                        >
                            Сотрудники
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:nth-of-type(even)': {
                                    backgroundColor: 'rgba(5, 113, 255, 0.02)'
                                },
                                '&:hover': {
                                    backgroundColor: 'rgba(5, 113, 255, 0.05)'
                                }
                            }}
                        >
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 500,
                                    color: '#2a4365',
                                    borderBottom: '1px solid rgba(5, 113, 255, 0.05)',
                                    maxWidth: '120px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {row.date}
                            </TableCell>
                            <TableCell
                                sx={{
                                    textAlign: 'center',
                                    fontWeight: 500,
                                    color: '#2a4365',
                                    borderBottom: '1px solid rgba(5, 113, 255, 0.05)'
                                }}
                            >
                                {row.employees.join(', ')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}