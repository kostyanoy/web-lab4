import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const PointsTable  = () => {
    return (
        <div style={{ maxHeight: '800px', overflowY: 'auto', float: 'right', width: '45%', marginTop: '70px', marginRight: '50px', padding: '5px', borderRadius: '10px', backgroundColor: '#886750' }}>
            <TableContainer component={Paper}>
                <Table style={{ color: '#cccccc' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" style={{ backgroundColor: '#886750', color: '#cccccc' }}>X</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#886750', color: '#cccccc' }}>Y</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#886750', color: '#cccccc' }}>R</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#886750', color: '#cccccc' }}>Result</TableCell>
                            <TableCell align="center" style={{ backgroundColor: '#886750', color: '#cccccc' }}>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PointsTable;
