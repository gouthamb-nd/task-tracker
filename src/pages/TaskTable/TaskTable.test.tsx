import TaskTable from './TaskTable'
import userEvent from '@testing-library/user-event'
import { render, screen, getByTestId, fireEvent, waitFor} from '@testing-library/react';


let deleteTask = jest.fn();
let handleCancel = jest.fn();
let editId = -1;
let setEditId = jest.fn();
let editFormData = {id: -1, taskName: "", taskDescription: "", taskStatus: ""}
let setEditFormData = jest.fn();
let handleEditSubmit = jest.fn();

describe('TaskTable', () => {

    const rows = [
    {
      id: 1,
      taskName: "Task 1",
      taskDescription: "Task Desc 1",
      taskStatus: "pending",
    },
    {
      id: 2,
      taskName: "Task 2",
      taskDescription: "Task Desc 2",
      taskStatus: "pending",
    },
    {
      id: 3,
      taskName: "Task 3",
      taskDescription: "Task Desc 3",
      taskStatus: "pending",
    }
    ]
    test('All rows are rendered properly', () => {
        render(<TaskTable
          rows={rows} deleteTask={deleteTask} handleCancel={handleCancel}
          editId={editId} setEditId={setEditId} editFormData={editFormData} setEditFormData={setEditFormData} 
          handleEditSubmit={handleEditSubmit}
          />);

        const row = screen.getByRole('cell', {name: 'Task 1'})
        expect(row).toBeInTheDocument();
        

    })

    test("rows is being deleted on click", async()=>{
        const {debug, container} = render(<TaskTable
        rows={rows} deleteTask={deleteTask} handleCancel={handleCancel}
        editId={editId} setEditId={setEditId} editFormData={editFormData} setEditFormData={setEditFormData} 
        handleEditSubmit={handleEditSubmit}
        />);
        const cellOne = screen.getByRole('cell', {name: 'Task 1'})
        const deleteButton = screen.getByRole('button', { name: 'delete-1' });
        
        await userEvent.click(deleteButton)
        expect(deleteTask).toHaveBeenCalled();
       
        

    })

    test("rows is being updated ", async()=>{

      
      const {debug, container} = render(<TaskTable
        rows={rows} deleteTask={deleteTask}  handleCancel={handleCancel}
        editId={1} setEditId={setEditId} editFormData={editFormData} setEditFormData={setEditFormData} 
        handleEditSubmit={handleEditSubmit}
        />);

      const InputOne = screen.getByTestId('taskName') as HTMLInputElement 
      await waitFor(()=>{ expect(InputOne).toBeInTheDocument()
        console.log(InputOne)
      })

      fireEvent.blur(InputOne, {target:{ value: "Buy a midi"}})
      expect(InputOne.value).toBe("Buy a midi")
      const submitButton = screen.getByTestId('CheckBoxIcon')
      fireEvent.click(submitButton)

      await waitFor(()=>{
      expect(handleEditSubmit).toHaveBeenCalled()})
       
});
    

}) 