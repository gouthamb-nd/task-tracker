import React from "react";
import {   
    IconButton,
    Select,
    MenuItem,
    SelectChangeEvent,
  
  } from "@mui/material";
  import CheckBoxIcon from "@mui/icons-material/CheckBox";
  import CancelIcon from "@mui/icons-material/Cancel";
  import { StyledInput, StyledTableCell, StyledTableRow } from "../TaskTable.styles";

import { gridObject } from "../../../types/CommonTypes";
type EditableRowType = {
    editFormData: gridObject
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
    handleCancel: ()=> void,
    handleSelectChange: (e: SelectChangeEvent<string>)=>void
}


const EditableRow = ({editFormData, handleEditChange, handleCancel, handleSelectChange}: EditableRowType) => {
  return (
    <StyledTableRow >
      <StyledTableCell component="td" scope="row">
        {editFormData.id}
    </StyledTableCell>
    <StyledTableCell sx={{ minWidth: "12.5rem" }}>
        <StyledInput
          type="text"
          required={true}
          name="taskName"
          value={editFormData.taskName}
          onChange={(e)=>handleEditChange(e)}
          data-testid={`taskName`}
          
         ></StyledInput>
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: "19rem" }}>
        <StyledInput
          type="text"
          required={true}
          name="taskDescription"
          value={editFormData.taskDescription}
          onChange={(e)=>handleEditChange(e)}
          sx={{ minWidth: "10rem" }}
        ></StyledInput>
  
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: "12.5rem" }}>
        <Select
          required={true}
          name="taskStatus"
          defaultValue={editFormData.taskStatus}
          onChange={(e)=>handleSelectChange(e)}
          fullWidth
          sx={{height: "1.5rem", width: "7rem"}}
          >
            <MenuItem value={"To Start"}>To Start</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"FInished"}>Finished</MenuItem>

        </Select>
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: "9rem" }}>
        <IconButton type="submit"><CheckBoxIcon/></IconButton>
        <IconButton type="button" onClick={handleCancel}>
          <CancelIcon/>
        </IconButton>
      </StyledTableCell>
      <StyledTableCell sx={{ minWidth: "6rem" }}></StyledTableCell>
    </StyledTableRow>
  );
};

export default EditableRow;
