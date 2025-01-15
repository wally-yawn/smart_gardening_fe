describe('recommendations', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/')
  })

  it('shows the main page before a search has not been completed with a default garden', () => {
    cy.get('h1').contains('Smart Gardening')
    .get('.my-garden-button').should('exist')
    .get('.garden-form-section > h1').contains('Input Garden Info')
  })
})