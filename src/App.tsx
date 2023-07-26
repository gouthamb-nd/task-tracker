import TaskForm from "./pages/TaskForm";
import TaskTable from "./pages/TaskTable";
import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import { Route, Routes} from "react-router-dom";
import "./App.css";
import { Stack } from "@mui/material";



function App() {


  return (
    <div className="App">
      <ResponsiveAppBar />

      <Stack  justifyContent="center" direction="row" marginTop={5} height="80vh">
        <Routes>
          <Route
            path="/"
            element={
              <TaskTable/>
            }
          />
          <Route path="/add" element={<TaskForm />} />
        </Routes>
      </Stack>

    
    </div>
  );
}

export default App;
