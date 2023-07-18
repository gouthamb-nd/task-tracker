import { useState } from "react";
import TaskForm from "./pages/TaskForm";
import TaskTable from "./pages/TaskTable";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import { Route, Routes} from "react-router-dom";
import "./App.css";
import { gridObject } from "./types/CommonTypes";
import { Stack } from "@mui/material";


type addType = {
  taskName: string;
  taskDescription: string;
};

type gridRowType = gridObject[];

function App() {
  const [tasks, setTasks] = useState<gridRowType>([
    {
      id: 1,
      taskName: "Task 1",
      taskDescription: "Task Desc 1",
      taskStatus: "Pending",
    },
    {
      id: 2,
      taskName: "Task 2",
      taskDescription: "Task Desc 2",
      taskStatus: "Pending",
    },
    {
      id: 3,
      taskName: "Task 3",
      taskDescription: "Task Desc 3",
      taskStatus: "Pending",
    },
  ]);

  
  const [editId, setEditId] = useState(-1)

  const [editFormData, setEditFormData] =useState<gridObject>({id: -1, taskName: "", taskDescription: "", taskStatus: ""}) 
 
  const addTask = (task: addType): void => {
    
    const id = (tasks?.[tasks.length-1]?.id)
    const freshTask =  { id: id?id+1:0,  ...task, taskStatus: "Pending" };

    setTasks((prev) => [...prev, freshTask]);
   
  };

  const deleteTask = (id?: number)=> {
    setTasks((prev) => prev.filter((task) => task.id!== id));
  };

  

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    const edited = {
        id: editFormData.id,
        taskName: editFormData.taskName,
        taskDescription: editFormData.taskDescription,
        taskStatus: editFormData.taskStatus
    }

    const i = tasks.findIndex(item => item.id === edited.id);
    const freshTask = tasks
    freshTask.splice(i, 1, edited)
    setEditId(-1)
   }

   const handleCancel = ()=>{
    setEditId(-1)
   }

  return (
    <div className="App">
      <ResponsiveAppBar />

      <Stack  justifyContent="center" direction="row" marginTop={5} height="80vh">
        <Routes>
          <Route
            path="/"
            element={
              <TaskTable
              rows={tasks} deleteTask={deleteTask} handleCancel={handleCancel}
              editId={editId} setEditId={setEditId} editFormData={editFormData} setEditFormData={setEditFormData} 
              handleEditSubmit={handleEditSubmit}
              />
            }
          />
          <Route path="/add" element={<TaskForm addTask={addTask} />} />
        </Routes>
      </Stack>

    
    </div>
  );
}

export default App;
