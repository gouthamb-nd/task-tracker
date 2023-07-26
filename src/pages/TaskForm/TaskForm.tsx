import { Box, FormLabel, TextField, Typography, Button } from "@mui/material"
import { FormContainer, StyledFormControl, ErrorBox } from "./TaskForm.styles";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import {useAddTasks, useGetTasks} from '../../hooks/useTaskData'
import { TaskType } from "./TaskForm.types";





const TaskForm = ()=> {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const { data:prevTasks} = useGetTasks()
    const { register, handleSubmit,  formState: { errors }, reset  } = useForm<TaskType>();
    const {mutate} = useAddTasks()

    const onSubmit = (formData: TaskType) => {
      const prevData = prevTasks?.data
      const lastItem = prevData[prevData?.length -1 ]
      const edited ={
        id: lastItem.id + 1,
        taskName: formData.taskName,
        taskDescription: formData.taskDescription,
        taskStatus: "To Start"
      }
      mutate(edited)
      setIsSubmitted(true)
      reset()     
      setTimeout(() => {
      setIsSubmitted(false);
    }, 3000); } ;
    


  return (
  <Box>
    <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
            <StyledFormControl>
            <FormLabel sx={{marginBottom: 3}}> <Typography variant="h5">Enter Task Details</Typography></FormLabel>           
            <TextField label="Task Name" variant="outlined"  id="task-name"
             {...register("taskName", { required: true })}/>            
            <ErrorBox>
            {errors.taskName && <h5>Task name is required</h5>}
            </ErrorBox>

            <TextField  label="Task Description" variant="outlined" rows={3} multiline id="task-description"
            {...register("taskDescription", { required: true })} />         
            <ErrorBox>
              {errors.taskDescription && <h5>Task description is required</h5>}
            </ErrorBox>
            <Button type="submit">Submit</Button>
            </StyledFormControl>           
        </form>
    </FormContainer>
    {isSubmitted ? (
    <Box marginTop={5}>Form submitted successfully!</Box>
    ) :null}
    
  </Box>
  )
}

export default TaskForm