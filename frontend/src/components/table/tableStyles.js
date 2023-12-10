import { styled } from '@mui/system';
import { TableCell, TableContainer, Table, TableRow } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)`
  max-height: 800px;
  overflow-y: auto;
  float: right;
  width: 45%;
  margin-top: 30px;
  margin-right: 50px;
  padding: 5px;
  border-radius: 10px;
  background-color: #886750;

  @media (min-width: 1255px) {
    margin-top: 20px;
    width: 45%;
  }

  @media (min-width: 814px) and (max-width: 1254px) {
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 20px;
    width: 90%;
    float: none;
    max-height: 350px;

  }

  @media screen and (max-width: 814px) {
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 20px;
    width: 90%;
    float: none;
    max-height: 300px;

  }
`;


export const StyledTable = styled(Table)`
  color: #cccccc;
`;

export const StyledTableRow = styled(TableRow)`
  background-color: #886750;
  color: #cccccc;
`;

export const StyledTableCell = styled(TableCell)`
  background-color: #886750;
  color: #cccccc;
`;