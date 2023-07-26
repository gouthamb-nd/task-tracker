import { gridObject } from "../../types/CommonTypes";
import {SelectChangeEvent} from "@mui/material";

export type EditTaskType = {
    taskName: string,
    taskDescription: string;
    taskStatus: string;
  }

export type ReadOnlyProps = {
    row: gridObject
    handleSelectRow: (e : React.MouseEvent<HTMLElement>, row:gridObject)
     => void,
    deleteTask: (id?: number)=> void
}


 export type EditableRowType = {
      editFormData: gridObject
      handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
      handleCancel: ()=> void,
      handleSelectChange: (e: SelectChangeEvent<string>)=>void,
      nameError: string,
      descError: string
     
  }