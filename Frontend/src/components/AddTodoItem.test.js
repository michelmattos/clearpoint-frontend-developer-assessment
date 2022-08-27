import { render, screen } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import {AddTodoItem} from "./AddTodoItem";

test('Renders "description" as a field value', () => {
  const description = 'My todo'
  render(
    <AddTodoItem
      description={description}
      handleAdd={() => {}}
      handleClear={() => {}}
      handleDescriptionChange={() => {}}
    />
  )
  expect(screen.getByLabelText(/description/i).value).toBe(description)
})

test('Calls "handleDescriptionChange" when description changed', () => {
  const handleDescriptionChange = jest.fn()
  render(
    <AddTodoItem
      description=""
      handleDescriptionChange={handleDescriptionChange}
      handleAdd={() => {}}
      handleClear={() => {}}
    />
  )
  const value = 'a'
  userEvent.type(screen.getByLabelText(/description/i), value)
  expect(handleDescriptionChange).toHaveBeenCalledWith(value)
})

test('Calls "handleAdd" when an item is added', () => {
  const handleAdd = jest.fn()
  render(
    <AddTodoItem
      description=""
      handleAdd={handleAdd}
      handleDescriptionChange={() => {}}
      handleClear={() => {}}
    />
  )
  userEvent.click(screen.getByRole('button', {name: /add item/i}))
  expect(handleAdd).toHaveBeenCalledTimes(1)
})

test('Calls "handleClear" when clicked', () => {
  const handleClear = jest.fn()
  render(
    <AddTodoItem
      description=""
      handleClear={handleClear}
      handleAdd={() => {}}
      handleDescriptionChange={() => {}}
    />
  )
  userEvent.click(screen.getByRole('button', {name: /clear/i}))
  expect(handleClear).toHaveBeenCalledTimes(1)
})