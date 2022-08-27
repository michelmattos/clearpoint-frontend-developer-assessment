import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoItems } from './TodoItems'

test('Calls "getItems" when refreshed', () => {
  const getItems = jest.fn()
  render(<TodoItems getItems={getItems} items={[]} handleMarkAsComplete={() => {}} />)
  userEvent.click(screen.getByRole('button', { name: /refresh/i }))
  expect(getItems).toHaveBeenCalledTimes(1)
})

test('Renders items', () => {
  const items = [
    { id: 1, description: 'Todo 1' },
    { id: 2, description: 'Todo 2' },
  ]
  render(<TodoItems items={items} getItems={() => {}} handleMarkAsComplete={() => {}} />)
  expect(screen.getByRole('cell', { name: /^1$/i }))
  expect(screen.getByRole('cell', { name: /todo 1/i }))
  expect(screen.getByRole('cell', { name: /^2$/i }))
  expect(screen.getByRole('cell', { name: /todo 2/i }))
})

test('Mark an item as completed', () => {
  const items = [
    { id: 1, description: 'Todo 1' },
    { id: 2, description: 'Todo 2' },
  ]
  const handleMarkAsComplete = jest.fn()
  render(<TodoItems items={items} handleMarkAsComplete={handleMarkAsComplete} getItems={() => {}} />)
  userEvent.click(screen.getAllByRole('button', { name: /mark as completed/i })[0])
  expect(handleMarkAsComplete).toHaveBeenCalledWith(items[0])
  expect(handleMarkAsComplete).not.toHaveBeenCalledWith(items[1])
  handleMarkAsComplete.mockClear()
  userEvent.click(screen.getAllByRole('button', { name: /mark as completed/i })[1])
  expect(handleMarkAsComplete).not.toHaveBeenCalledWith(items[0])
  expect(handleMarkAsComplete).toHaveBeenCalledWith(items[1])
})
