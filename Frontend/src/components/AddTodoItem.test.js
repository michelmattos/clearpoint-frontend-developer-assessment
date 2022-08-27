import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTodoItem } from './AddTodoItem'

test('Calls "handleAdd" when an item is added', () => {
  const handleAdd = jest.fn()
  const todo = 'My todo'
  render(<AddTodoItem handleAdd={handleAdd} />)
  userEvent.type(screen.getByLabelText(/description/i), todo)
  userEvent.click(screen.getByRole('button', { name: /add item/i }))
  expect(handleAdd).toHaveBeenCalledTimes(1)
  expect(handleAdd).toHaveBeenCalledWith(todo)
})

test('Clears field when "clear" button is clicked', () => {
  const todo = 'My todo'
  render(<AddTodoItem handleAdd={() => {}} />)
  userEvent.type(screen.getByLabelText(/description/i), todo)
  expect(screen.getByLabelText(/description/i)).toHaveValue(todo)
  userEvent.click(screen.getByRole('button', { name: /clear/i }))
  expect(screen.getByLabelText(/description/i)).toHaveValue('')
})

test('Shows message when an error exist', () => {
  const errorMessage = 'Uh oh!'
  render(<AddTodoItem errorMessage={errorMessage} />)
  expect(screen.getByLabelText(/description/i)).toHaveErrorMessage(errorMessage)
})
