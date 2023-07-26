import {   
    IconButton,
    Select,
    MenuItem,
  } from "@mui/material";
  import CheckBoxIcon from "@mui/icons-material/CheckBox";
  import CancelIcon from "@mui/icons-material/Cancel";
  import { StyledInput, StyledTableCell, StyledTableRow, ErrorBox } from "../TaskTable.styles";
  import { EditableRowType } from "../TaskTable.types";





const EditableRow = ({editFormData, handleInputChange, handleCancel, handleSelectChange, nameError, descError }: EditableRowType) => {


  return (
    <StyledTableRow >
      <StyledTableCell component="td" scope="row">
        {editFormData.id}
      </StyledTableCell>

      <StyledTableCell sx={{ minWidth: "12.5rem" }}>
        <StyledInput
          type="text"
          value={editFormData.taskName}
          name="taskName"
          onChange={e=>handleInputChange(e)}
          data-testid={`taskName-${editFormData.id}`}
          sx={{borderColor: `${!!nameError? "red": "black"}`}} 
          ></StyledInput>
          <ErrorBox>{nameError}</ErrorBox>
      </StyledTableCell>

      <StyledTableCell sx={{ minWidth: "19rem" }}>
        <StyledInput
          type="text"
          name="taskDescription"
          value={editFormData.taskDescription}
          onChange={(e)=>handleInputChange(e)}
          sx={{borderColor: `${!!descError? "red": "black"}`  }}
          // {...register("taskDescription", { required: true })}
        ></StyledInput>
        <ErrorBox>{descError}</ErrorBox>
      </StyledTableCell>

      <StyledTableCell sx={{ minWidth: "12.5rem" }}>
        <Select
          name="taskStatus"
          value={editFormData.taskStatus}
          onChange={(e)=>handleSelectChange(e)}
          fullWidth
          sx={{height: "1.5rem", width: "7rem"}}
          // {...register("taskStatus", { required: true })}
          >
            <MenuItem value={"To Start"}>To Start</MenuItem>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"FInished"}>Finished</MenuItem>

        </Select>
      </StyledTableCell>

      <StyledTableCell sx={{ minWidth: "9rem" }}>
        <IconButton type="submit" data-testid={`check-${editFormData.id}`} >
          <CheckBoxIcon/></IconButton>
        <IconButton type="button" onClick={handleCancel}>
          <CancelIcon/>
        </IconButton>
      </StyledTableCell>

    </StyledTableRow>
  );
};

export default EditableRow;
