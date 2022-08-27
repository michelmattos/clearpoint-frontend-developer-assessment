describe("to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("displays headings", () => {
    cy.findAllByRole("heading").contains(/add item/i)
  })
})
