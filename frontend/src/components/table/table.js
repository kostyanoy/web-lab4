import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { connect, useDispatch } from "react-redux";
import { getPoints } from "../../redux/actions/pointsActions";

const PointsTable = ({ points }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLoad = () => {
            dispatch(getPoints(0));
        };
        window.addEventListener('load', handleLoad);
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, [dispatch]);

    return (
        <div style={{
            maxHeight: '800px',
            overflowY: 'auto',
            float: 'right',
            width: '45%',
            marginTop: '70px',
            marginRight: '50px',
            padding: '5px',
            borderRadius: '10px',
            backgroundColor: '#886750'
        }}>
            <TableContainer component={Paper}>
                <Table style={{ color: '#cccccc' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"
                                       style={{ backgroundColor: '#886750', color: '#cccccc' }}>X</TableCell>
                            <TableCell align="center"
                                       style={{ backgroundColor: '#886750', color: '#cccccc' }}>Y</TableCell>
                            <TableCell align="center"
                                       style={{ backgroundColor: '#886750', color: '#cccccc' }}>R</TableCell>
                            <TableCell align="center"
                                       style={{ backgroundColor: '#886750', color: '#cccccc' }}>Result</TableCell>
                            <TableCell align="center"
                                       style={{ backgroundColor: '#886750', color: '#cccccc' }}>Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {points.map((point, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{point.x}</TableCell>
                                <TableCell align="center">{point.y}</TableCell>
                                <TableCell align="center">{point.r}</TableCell>
                                <TableCell align="center">{point.result ? "true" : "false"}</TableCell>
                                <TableCell align="center">{point.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        points: state.points,
    };
};

export default connect(mapStateToProps)(PointsTable);
