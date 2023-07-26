import TaskForm from './TaskForm';
import userEvent from '@testing-library/user-event'
import { getByLabelText, render,screen, fireEvent,waitFor, FindByText } from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useDeleteTasks } from '../../hooks/useTaskData';


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

  const server = setupServer(
    rest.get('http://localhost:4000/tasks', (req, res, ctx) => {
      return res(ctx.json(rows));
    })
,
    rest.delete('http://localhost:4000/tasks/1', (req, res, ctx) => {
      return res(ctx.json({message: "deleted successfully"}));
    })

  );
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());



describe('TaskForm', () => {

  test('All form elements are present', () => {


        const queryClient = new QueryClient();

        render(
        <QueryClientProvider client={queryClient}>
            <TaskForm/>
        </QueryClientProvider>
        );
  
    const taskName = screen.getByLabelText(/Task Name/i);
    const taskDescription = screen.getByLabelText(/Task Description/i)
    const taskButton = screen.getByRole("button")
    expect(taskName).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
    expect(taskButton).toBeInTheDocument();
  });

  test("Error when textfields are empty", async()=> {
    const queryClient = new QueryClient();

    render(
        <QueryClientProvider client={queryClient}>
            <TaskForm/>
        </QueryClientProvider>
        );
    const taskButton = screen.getByRole("button")
    fireEvent.click(taskButton)
    const nameError = await screen.findByText("Task name is required")
    const descriptionError = await screen.findByText("Task description is required")

    await waitFor(() => expect(nameError).toBeInTheDocument())
    await waitFor(() => expect(descriptionError).toBeInTheDocument())
  });


  
test("message displayed when submission is successful", async()=> {
    const queryClient = new QueryClient();

    render(
        <QueryClientProvider client={queryClient}>
            <TaskForm/>
        </QueryClientProvider>
        );
  const taskName = screen.getByLabelText(/Task Name/i);
  const taskDescription = screen.getByLabelText(/Task Description/i)
  const taskButton = screen.getByRole("button")

  userEvent.type(taskName, "react");
  await waitFor(()=>{expect(taskName).toHaveValue('react')})
  userEvent.type(taskDescription, "testing");
  await waitFor(()=>{expect(taskDescription).toHaveValue('testing')})

  userEvent.click(taskButton)

  const successMessage = await screen.findByText("Form submitted successfully!")
  await waitFor(() => expect(successMessage).toBeInTheDocument())

  
});



})


