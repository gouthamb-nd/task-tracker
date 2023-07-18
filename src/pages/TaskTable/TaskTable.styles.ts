import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import { Box, TableCell, TableRow } from '@mui/material';

export const TableWrapper = styled(Box)`

    max-height: 30rem;
    overflow: auto;
`


export const StyledTable = styled(Table)`
                
    width: 50rem;
    max-height: 50rem;
    color: #fff;
    font-weight: 'bold';
    `;
          


export const StyledTableHead = styled(TableHead)`
    .MuiTableCell-head{
        color: #fff;
    }
    padding: ${({theme})=> theme.spacing(5)};
     background-color: #1976d2;
     `


export const StyledTableCell = styled(TableCell)`
    font-size: 1rem;
    height: 1rem;
    box-sizing: border-box;
`


export const StyledInput = styled('input')`
    font-size: 1rem;
    height: 1rem;
    width: 6rem;
    padding: ${({theme})=> theme.spacing(1.5)};
`

export const StyledTableRow = styled(TableRow)`
    width: 40rem;
    height: 2rem;
    box-sizing: border-box;
`

