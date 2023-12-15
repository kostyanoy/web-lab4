import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getPointsForTable} from '../../redux/actions/pointsActions';
import {StyledTableContainer, StyledTable, StyledTableRow, StyledTableCell,} from './tableStyles';
import {Paper, TableBody, TableHead} from "@mui/material";
const PointsTable = ({points}) => {
    const dispatch = useDispatch();

        useEffect(() => {
            (async () => {
                try {
                    await dispatch(getPointsForTable());
                } catch (error) {
                    console.error('Error loading points for the table', error);
                }
            })();
        }, [dispatch]);

    return (
        <StyledTableContainer component={Paper}>
            <StyledTable>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">X</StyledTableCell>
                        <StyledTableCell align="center">Y</StyledTableCell>
                        <StyledTableCell align="center">R</StyledTableCell>
                        <StyledTableCell align="center">Result</StyledTableCell>
                        <StyledTableCell align="center">Time</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {points.map((point, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell align="center">{point.x}</StyledTableCell>
                            <StyledTableCell align="center">{point.y}</StyledTableCell>
                            <StyledTableCell align="center">{point.r}</StyledTableCell>
                            <StyledTableCell align="center">{point.result ? "true" : "false"}</StyledTableCell>
                            <StyledTableCell align="center">{point.time}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </StyledTableContainer>
    );
};
const mapStateToProps = (state) => {
    return {
        points: state.pointsForTable,
    };
};
export default connect(mapStateToProps)(PointsTable);
