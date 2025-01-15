describe('recommendations', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/gardens/1',{
      fixture: 'gardens'
    })

    cy.intercept('GET', 'http://localhost:3000/api/v1/recommendation?zip_code=80209&sunlight=Full+Sun&soil_type=Loamy&water_needs=High&purpose=Food+Production', {
      fixture: 'recommendations'
    })
    cy.visit('http://localhost:3001/')
    
  })

  it('shows the main page before a search has not been completed with a default garden', () => {
    cy.get('h1').contains('Smart Gardening')
    .get('.my-garden-button').should('exist')
    .get('.garden-form-section > h1').contains('Input Garden Info')
    .get('.form-row > :nth-child(1) > :nth-child(1)').should('have.value','80209')
    .get('select[name="name"]').should('have.value', 'Vegetable Garden')
    .get('select[name="soil_type"]').should('have.value', 'Loamy')
    .get('select[name="sunlight"]').should('have.value', 'Full Sun')
    .get('select[name="water_needs"]').should('have.value', 'High')
    .get('select[name="purpose"]').should('have.value', 'Food Production')
    .get('.recommendations-header').contains('Recommendations')
    .get('.default-message').contains('Enter your garden information and click Search to get recommendations!')
  })

  it('shows recommendations after clicking Search', () => {
    cy.get('.search-button').click()
    .get('.plant-cards').find('.plant-card').should('have.lengthOf', 2)
    .get('.plant-cards > :nth-child(1) > h3').contains('Strawberry')
    .get('.plant-cards > :nth-child(1) > img').should('have.attr', 'src', 'https://example.com/mock-strawberry.jpg')
    .get('.plant-cards > :nth-child(1) > img').should('have.attr', 'alt', 'Strawberry')
    .get('.plant-cards > :nth-child(1) > p').contains('Thrives in loamy soil and full sun, ideal for food production.')
    .get('.plant-cards > :nth-child(2) > h3').contains('Basil')
    .get('.plant-cards > :nth-child(2) > img').should('have.attr', 'src', 'https://example.com/mock-basil.jpg')
    .get('.plant-cards > :nth-child(2) > img').should('have.attr', 'alt', 'Basil')
    .get('.plant-cards > :nth-child(2) > p').contains('Aromatic herb thriving in full sun with moderate watering.')

  })
})
