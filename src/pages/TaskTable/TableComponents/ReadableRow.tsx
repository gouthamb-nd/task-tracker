import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    IconButton,
    
  } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../TaskTable.styles";
import { ReadOnlyProps } from "../TaskTable.types";


const ReadableRow = ({row, handleSelectRow, deleteTask}: ReadOnlyProps) => {
  return (
    <StyledTableRow>
      <StyledTableCell>{row.id}</StyledTableCell>
      <StyledTableCell  sx={{ minWidth: "12.5rem" }}>{row.taskName}</StyledTableCell>
      <StyledTableCell  sx={{ minWidth: "19rem" }}>{row.taskDescription}</StyledTableCell>
      <StyledTableCell  sx={{ minWidth: "12.5rem" }}>{row.taskStatus}</StyledTableCell>
      <StyledTableCell sx={{ minWidth: "9rem" }}>
        
        <IconButton onClick={(e)=>{handleSelectRow(e, row)}} data-testid={`edit-${row.id}`}>
          <EditIcon />
        </IconButton>
        <IconButton  onClick={() => deleteTask(row.id)} data-testid={`delete-${row.id}`}>
          <DeleteIcon />
        </IconButton>
        </StyledTableCell>
    </StyledTableRow>
  );
};

export default ReadableRow;
