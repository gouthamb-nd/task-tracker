import TaskForm from './TaskForm';
import userEvent from '@testing-library/user-event'
import { getByLabelText, render,screen, fireEvent,waitFor, FindByText } from '@testing-library/react';

let mockFn = jest.fn();


describe('TaskForm', () => {

  test('All form elements are present', () => {
    render(<TaskForm addTask={mockFn}/>);
    const taskName = screen.getByLabelText(/Task Name/i);
    const taskDescription = screen.getByLabelText(/Task Description/i)
    const taskButton = screen.getByRole("button")
    expect(taskName).toBeInTheDocument();
    expect(taskDescription).toBeInTheDocument();
    expect(taskButton).toBeInTheDocument();
  });

  test("Error when textfields are empty", async()=> {
    render(<TaskForm addTask={mockFn}/>)
    const taskButton = screen.getByRole("button")
    fireEvent.click(taskButton)
    const nameError = await screen.findByText("Task name is required")
    const descriptionError = await screen.findByText("Task description is required")

    await waitFor(() => expect(nameError).toBeInTheDocument())
    await waitFor(() => expect(descriptionError).toBeInTheDocument())
  });


  
test("message displayed when submission is successful", async()=> {
  render(<TaskForm addTask={mockFn}/>)
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


