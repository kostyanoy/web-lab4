import { styled } from '@mui/system';
import { TableCell, TableContainer, Table, TableRow } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)`
  max-height: 800px;
  width: 45%;
  margin-top: 30px;
  margin-right: 50px;
  padding: 5px;
  border-radius: 10px;
  background-color: #886750;
  overflow-y: auto;

  /* Десктопный режим */
  @media (min-width: 1255px) {
    float: right;
    margin-top: 20px;
    width: 45%;
    max-height: 600px;
  }
  /* Планшетный режим */
  @media (min-width: 814px) and (max-width: 1254px) {
    margin-top: 5px;
    margin-right: auto;
    margin-left: auto;
    width: 95%;
    height: 45%;
    max-height: 380px;
    overflow-y: auto;
  }
  /* Мобильный режим */
  @media screen and (max-width: 814px) {
    margin-top: 5px;
    margin-right: auto;
    margin-left: auto;
    width: 98%;
    height: 45%;
    max-height: 200px;
    overflow-y: auto;

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