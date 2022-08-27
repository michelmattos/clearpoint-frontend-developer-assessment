describe("to-do app", () => {
  beforeEach(() => {
    cy.request("delete", "http://localhost:7000/api/todoItems/test/clearAll")
    cy.visit("/")
  })

  it("users can add todos", () => {
    // Check if there is no existing to-do items already
    cy.findAllByRole("heading").contains(/showing 0 item/i)
    cy.get("tbody > tr").should("have.length", 0)

    // Check if the user can add a to-do item
    const todo = "My todo"
    cy.findByLabelText(/description/i).type(todo)
    cy.findByRole("button", { name: /add item/i }).click()
    cy.findAllByRole("heading").contains(/showing 1 item/i)
    cy.get("tbody > tr").should("have.length", 1)
    cy.get("tbody > tr:nth-child(1) > td:nth-child(2)").should(
      "have.text",
      todo
    )

    // Check if the user can add another to-do item
    const anotherTodo = "Another todo"
    cy.findByRole("button", { name: /clear/i }).click()
    cy.findByLabelText(/description/i).type(anotherTodo)
    cy.findByRole("button", { name: /add item/i }).click()
    cy.findAllByRole("heading").contains(/showing 2 item/i)
    cy.get("tbody > tr").should("have.length", 2)
    cy.get("tbody > tr:nth-child(1) > td:nth-child(2)").should(
      "have.text",
      todo
    )
    cy.get("tbody > tr:nth-child(2) > td:nth-child(2)").should(
      "have.text",
      anotherTodo
    )
  })

  it("users can mark/unmark todos", () => {
    cy.findByLabelText(/description/i).type("Todo 1")
    cy.findByRole("button", { name: /add item/i }).click()
    cy.findByRole("button", { name: /clear/i }).click()
    cy.findByLabelText(/description/i).type("Todo 2")
    cy.findByRole("button", { name: /add item/i }).click()

    // Check if the user can mark a to-do item as completed
    cy.get("tbody > tr:nth-child(1)")
      .findByRole("button", { name: /mark as completed/i })
      .click()
    cy.get("tbody > tr:nth-child(1) > td:nth-child(3)").should(
      "have.text",
      "Yes"
    )
    cy.get("tbody > tr:nth-child(2) > td:nth-child(3)").should(
      "have.text",
      "No"
    )

    // Check if the user can mark a to-do item as uncompleted
    cy.get("tbody > tr:nth-child(1)")
      .findByRole("button", { name: /mark as uncompleted/i })
      .click()
    cy.get("tbody > tr:nth-child(1) > td:nth-child(3)").should(
      "have.text",
      "No"
    )
    cy.get("tbody > tr:nth-child(2) > td:nth-child(3)").should(
      "have.text",
      "No"
    )
  })
})
