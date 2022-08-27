describe("to-do app", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  afterEach(() => {
    cy.request("delete", "http://localhost:7000/api/todoItems/test/clearAll")
  })

  it("can add a new todo", () => {
    // Check if there is no existing to-do items already
    cy.findAllByRole("heading").contains(/showing 0 item/i)
    cy.get("tbody > tr").should("have.length", 0)

    // Check if user can add a new to-do item
    const newTodo = "New todo"
    cy.findByLabelText(/description/i).type(newTodo)
    cy.findByRole("button", { name: /add item/i }).click()
    cy.findAllByRole("heading").contains(/showing 1 item/i)
    cy.get("tbody > tr").should("have.length", 1).and("contain.text", newTodo)
  })
})
