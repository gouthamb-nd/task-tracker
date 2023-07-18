import {
  TableBody,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  SelectChangeEvent
} from "@mui/material";

import RowComponent from "./TableComponents/RowComponent";
import { gridObject } from "../../types/CommonTypes";
import { StyledTable, StyledTableHead, TableWrapper } from "./TaskTable.styles";
import EditableRow from "./TableComponents/EditableRow";

type TableProps = {
  rows: gridObject[],
    deleteTask: (id?: number)=>void,
    editId: number,
    setEditId: (id:number) => void,
    editFormData : gridObject,
    setEditFormData: (taskData:gridObject)=>void,
    handleEditSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleCancel: ()=>void
};

export default function TaskTable({rows, deleteTask, editId, setEditId, editFormData, setEditFormData, handleEditSubmit, handleCancel}: TableProps) {

 const handleDelete = (e: React.MouseEvent<HTMLButtonElement>,id?:number)=>{
    e.preventDefault()
    deleteTask(id);
        
   }

  const handleEditClick = (e : React.MouseEvent<HTMLElement>, row:gridObject)=>{
    e.preventDefault();
    setEditId(row.id);
    const formValues = {
        id: row.id,
        taskName: row.taskName,
        taskDescription: row.taskDescription,
        taskStatus: row.taskStatus,
      };
  
    setEditFormData(formValues);
}

  const handleEditChange = (e :  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target
    const newFormData = {...editFormData, [name]: value}
    setEditFormData(newFormData)
}

  const handleSelectChange = (e : SelectChangeEvent<string>)=>{
    e.preventDefault();
    const { name, value } = e.target
    const newFormData = {...editFormData, [name]: value}
    setEditFormData(newFormData)

}



  return (
    <TableWrapper>
      <TableContainer component={Paper}>
      <form onSubmit={handleEditSubmit}>
        <StyledTable size="small">
          <StyledTableHead color="#fff">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell sx={{ minWidth: "12.5rem" }}>TASK NAME</TableCell>
              <TableCell sx={{ minWidth: "19rem" }}>TASK DESCRIPTION</TableCell>
              <TableCell>TASK STATUS</TableCell>
              <TableCell sx={{ minWidth: "9rem" }}>Edit</TableCell>
              <TableCell sx={{ minWidth: "6rem" }}>Delete</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
          {rows.map((row,index) => (
                        
                            editId === row.id? <EditableRow key={index} editFormData={editFormData} handleEditChange={handleEditChange} handleCancel={handleCancel} handleSelectChange={handleSelectChange}/>
                            : <RowComponent key={index} row={row} handleEditClick={handleEditClick} deleteTask={deleteTask}/>
                           
                        
                         
                    ))}
          </TableBody>
        </StyledTable>
        </form>
      </TableContainer>
    </TableWrapper>
  );
}
