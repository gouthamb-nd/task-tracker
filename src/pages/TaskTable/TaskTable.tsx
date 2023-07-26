import {
  TableBody,
  Paper,
  TableContainer,
  SelectChangeEvent,
  CircularProgress
} from "@mui/material";
import {  useState } from "react";
import ReadableRow from "./TableComponents/ReadableRow";
import { gridObject} from "../../types/CommonTypes";
import { StyledTable, TableWrapper } from "./TaskTable.styles";
import EditableRow from "./TableComponents/EditableRow";
import {useGetTasks, useDeleteTasks, useSubmitTasks} from '../../hooks/useTaskData'
import TableHeader from "./TableComponents/TableHeader";


const TaskTable= ()=> {

  const {data, isLoading} = useGetTasks()
  const { mutate: submitMutate } = useSubmitTasks()
  const { mutate: deleteMutate } = useDeleteTasks()
  const tempTask = data?.data
  const [editId, setEditId] = useState<number>(-1)
  const [editFormData, setEditFormData] =useState<gridObject>({id: -1, taskName: "", taskDescription: "", taskStatus: ""})
  const [nameError, setNameError] = useState("")
  const [descError, setDescError] = useState("")


  const deleteTask = (id?: number)=> {
    deleteMutate(id)
  }

  const handleCancel = ()=>{
    setEditId(-1)
   }

  const handleSelectRow = (e : React.MouseEvent<HTMLElement>, row:gridObject)=>{
    e.preventDefault()
    setEditId(row.id);
    
    const formValues = {
        id: row.id,
        taskName: row.taskName,
        taskDescription: row.taskDescription,
        taskStatus: row.taskStatus,
      };
      
    setEditFormData(formValues);   
}

  const handleInputChange = (e :  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

const validate = ()=>{
  if(editFormData.taskName === ""){
      setNameError("Task Name is required")
      return false
    }
    if(editFormData.taskDescription === ""){
      setDescError("Task Description is required")
      return false
    }
    return true
}

const submitChanges: React.FormEventHandler<HTMLFormElement> = (e)=>{
  
  e.preventDefault()
 if(validate()){
  const edited = {
      id: editId,
      taskName: editFormData.taskName,
      taskDescription: editFormData.taskDescription,
      taskStatus: editFormData.taskStatus
      
  }
  console.log(edited)
  submitMutate(edited)
  setEditId(-1)
 }
}


  if(isLoading){
    return <CircularProgress data-testid="progressbar"/>
  }

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
      <form onSubmit={submitChanges}>
        <StyledTable size="small">
          <TableHeader/>
          <TableBody>
          {tempTask?.map((task: gridObject,index: number) => (
                        
            editId === task.id? <EditableRow key={index} editFormData={editFormData} handleInputChange={handleInputChange}  
            handleSelectChange={handleSelectChange} handleCancel={handleCancel} nameError={nameError} descError={descError}/>
            : <ReadableRow key={index} row={task} handleSelectRow={handleSelectRow} deleteTask={deleteTask}/>
                           
            ))}
          </TableBody>
        </StyledTable>
        </form>
      </TableContainer>
    </TableWrapper>
  );
}

export default TaskTable