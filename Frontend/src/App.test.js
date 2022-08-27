import { render, screen, within } from '@testing-library/react'
import App from './App'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import userEvent from '@testing-library/user-event'

const baseUrl = 'http://localhost:7000/api/todoItems'
const server = setupServer()

beforeAll(() => server.listen())

afterAll(() => server.close())

afterEach(() => {
  server.resetHandlers()
})

test('renders the footer text', () => {
  render(<App />)
  const footerElement = screen.getByText(/clearpoint.digital/i)
  expect(footerElement).toBeInTheDocument()
})

test('shows error message when "list all todos" fails', async () => {
  const errorMessage = 'Uh oh!'
  server.use(
    rest.get(baseUrl, (_, res, ctx) => {
      return res(ctx.status(400), ctx.body(errorMessage))
    })
  )
  render(<App />)
  expect(await within(screen.getByTestId('toasts')).findByRole('alert')).toHaveTextContent(errorMessage)
})

test('shows error message when "update todo" fails', async () => {
  const errorMessage = 'Uh oh!'
  server.use(
    rest.get(baseUrl, (_, res, ctx) => {
      return res(ctx.json([{ id: 1, description: 'My todo', isCompleted: false }]))
    }),
    rest.put(`${baseUrl}/:id`, (_, res, ctx) => {
      return res(ctx.status(400), ctx.body(errorMessage))
    })
  )
  render(<App />)
  userEvent.click(await screen.findByRole('button', { name: /mark as completed/i }))
  expect(await within(screen.getByTestId('toasts')).findByRole('alert')).toHaveTextContent(errorMessage)
})
