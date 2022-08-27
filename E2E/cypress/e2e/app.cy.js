describe("to-do app", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  afterEach(() => {
    cy.request("delete", "http://localhost:7000/api/todoItems/test/clearAll")
  })

  it("displays headings", () => {
    cy.findAllByRole("heading").contains(/add item/i)
  })
})
