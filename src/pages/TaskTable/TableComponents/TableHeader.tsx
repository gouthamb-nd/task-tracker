import { StyledTableHead } from '../TaskTable.styles'
import {TableRow, TableCell} from '@mui/material'

const TableHeader = () => {
  return (
    <StyledTableHead color="#fff">    
         
    <TableRow>
              <TableCell>ID</TableCell>
              <TableCell sx={{ minWidth: "12.5rem" }}>TASK NAME</TableCell>
              <TableCell sx={{ minWidth: "19rem" }}>TASK DESCRIPTION</TableCell>
              <TableCell>TASK STATUS</TableCell>
              <TableCell sx={{ minWidth: "9rem" }}>Edit</TableCell>
    </TableRow>
    </StyledTableHead>
    
  )
}

export default TableHeader