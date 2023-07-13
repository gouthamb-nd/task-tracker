import { Box, FormLabel, TextField, Typography, Button } from "@mui/material"
import { FormContainer, StyledFormControl, ErrorBox } from "./TaskForm.styles";
import { useForm } from "react-hook-form";
import { useState } from 'react';


type TaskType = {
  
  taskName: string;
  taskDescription: string;
}

type TaskFormProps = {
  addTask: (task:TaskType)=>void;
}


function TaskForm({addTask}: TaskFormProps) {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit,  formState: { errors }, reset  } = useForm<TaskType>();

    const onSubmit = (data: TaskType) => {
      addTask(data)
      reset()
      
      setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
};
    


  return (
  <Box>
    <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
            <StyledFormControl>
            <FormLabel sx={{marginBottom: 3}}>  <Typography variant="h5">Enter Task Details</Typography></FormLabel>
                        
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
            <Button variant="contained" type="submit">Add</Button>

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