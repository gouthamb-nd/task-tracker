import TaskTable from './TaskTable'
import EditableRow from './TableComponents/EditableRow';
import { render, screen, getByTestId, fireEvent, waitFor, renderHook, findByTestId, act, findAllByRole, queryByTestId} from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {rest} from 'msw'  
import { server } from '../../mocks/server';
import { rows } from '../../mocks/handlers';
import { useGetTasks } from '../../hooks/useTaskData';
import { ReactNode } from 'react';

type GetHookType = {
  children: ReactNode
}


describe('TaskTable', () => {
  beforeEach(() => {
    server.use(       
        rest.get('http://localhost:4000/tasks/', (req, res, ctx) => {
        return res(ctx.json(rows))
      }),
      );
});

afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())
   
    test.only('All rows are rendered properly', async () => {

      const queryClient = new QueryClient();
      const wrapper = ({ children}: GetHookType) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      )
      const {result} = await renderHook(() => useGetTasks(), {wrapper});
      
      server.printHandlers()
      const {debug} = render(
        <QueryClientProvider client={queryClient}>
          <TaskTable/>
        </QueryClientProvider>
      );
        debug()



      // const progressbar = await screen.queryByTestId('progressbar')
      //  await waitFor(()=>{
      //    expect(progressbar).not.toBeInTheDocument();
      //  })
        

    })




    test("rows is being deleted on click", async()=>{

      const queryClient = new QueryClient();

      const {debug} = render(
        <QueryClientProvider client={queryClient}>
          <TaskTable/>
        </QueryClientProvider>
      );
      renderHook(()=> useGetTasks())
      await waitFor(()=>{
        const row = screen.queryByRole('cell', {name: 'Task 1'})

        expect(row).toBeInTheDocument();
      })

      
        const deleteButton = await screen.findByTestId('delete-1') as HTMLButtonElement
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton)
        
        await act(()=>{
        waitFor(()=>{
        const row = screen.queryByRole('cell', {name: 'Task 1'})
        expect(row).not.toBeInTheDocument()
        debug()
        })
      })

 

    })

    test("Inputs in the rows are being updated", async()=>{

      const queryClient = new QueryClient();
      const submitChanges = jest.fn()

      const {debug} = render(
        <QueryClientProvider client={queryClient}>
          <TaskTable/>
        </QueryClientProvider>
      );
      
      const editButton = await screen.findByTestId('edit-1')
      await waitFor(()=>{ 
        expect(editButton).toBeInTheDocument()
      })

      fireEvent.click(editButton)

      const inputOne = await screen.findByTestId('taskName-1')
      await waitFor(()=>{ 
        expect(inputOne).toBeInTheDocument()
      })

      fireEvent.blur(inputOne, { target: { value: 'Task 1 edited' } });
      await waitFor(()=>{ 
        expect(inputOne).toHaveValue('Task 1 edited')
      })

      const submitButton = await screen.findByTestId('check-1')
      expect(submitButton).toBeInTheDocument()      
  
});

  test("the edited details are submitted",async ()=>{
    const queryClient = new QueryClient();
      const editFormData = {
        id: 1,
        taskName: "Task 1",
        taskDescription: "Task Desc 1",
        taskStatus: "pending",
      }
      const handleInputChange = jest.fn()
      const handleSelectChange = jest.fn()
      const handleCancel = jest.fn()
      const submitChanges = jest.fn()
      const nameError = ""
      const descError = ""

      const {debug} = render(
        <QueryClientProvider client={queryClient}>
          <EditableRow editFormData={editFormData} handleInputChange={handleInputChange}  
            handleSelectChange={handleSelectChange} handleCancel={handleCancel} nameError={nameError} descError={descError}
            />
        </QueryClientProvider>

      )

      const submitButton =  screen.getByTestId('check-1')
      expect(submitButton).toBeInTheDocument()
      fireEvent.click(submitButton)
      await waitFor(()=>{ 
        expect(submitChanges).toHaveBeenCalled()
      })
  
    

}) 



})

