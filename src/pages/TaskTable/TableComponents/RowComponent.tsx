import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { gridObject } from "../../../types/CommonTypes";
import {
    IconButton,
    
  } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../TaskTable.styles";

type ReadOnlyProps = {
    row: gridObject
    handleEditClick: (e : React.MouseEvent<HTMLElement>, row:gridObject)
     => void,
    deleteTask: (id?: number)=> void
}

const RowComponent = ({row, handleEditClick, deleteTask}: ReadOnlyProps) => {
  return (
    <StyledTableRow>
      <StyledTableCell>{row.id}</StyledTableCell>
      <StyledTableCell  sx={{ minWidth: "12.5rem" }}>{row.taskName}</StyledTableCell>
      <StyledTableCell  sx={{ minWidth: "19rem" }}>{row.taskDescription}</StyledTableCell>
      <StyledTableCell  sx={{ minWidth: "12.5rem" }}>{row.taskStatus}</StyledTableCell>
      <StyledTableCell sx={{ minWidth: "9rem" }}>
        
        <IconButton onClick={(e)=>{handleEditClick(e, row)}} aria-label={`edit-${row.id}`} >
          <EditIcon />
        </IconButton>
        </StyledTableCell>
        <StyledTableCell sx={{ minWidth: "6rem" }}>
        <IconButton  onClick={() => deleteTask(row.id)} aria-label={`delete-${row.id}`}>
          <DeleteIcon />
        </IconButton>
        
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RowComponent;
