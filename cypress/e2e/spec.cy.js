describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders'}).as('orders')
    cy.visit('http://localhost:3000/')
  })

  it('should load stored orders upon load', () => {
    cy.get('.order').should('be.visible');
    cy.get('.order').should('include.text', 'Curtis')
  })

  it('should load order form upon load', () => {
    cy.get('form').should('be.visible');
    cy.get('form').should('include.text', 'Submit')
  })

  it('should allow the user to enter name in form input', () => {
    const name = "Zach"
    cy.get('.form-input')
      .type(name)
      .should('have.value', name)
  })

  it('should allow the user to select ingredients and list them in an order summary', () => {
    cy.get('.beans').click()
    cy.get('.steak').click()
    cy.get('.lettuce').click()
    cy.get('.order-list').should('include.text', 'beans')
    cy.get('.order-list').should('include.text', 'steak')
    cy.get('.order-list').should('include.text', 'lettuce')
  })

  it('should allow the user to submit an order if a name and at least one ingredient are entered', () => {
    const name = "Curtis"
    cy.get('.form-input')
      .type(name)
    cy.get('.beans').click()
    cy.get('.steak').click()
    cy.get('.lettuce').click()
    cy.get('.order').should('include.text', name)
  })

  it('should not allow the user to submit an order if a name has not been entered', () => {
    const name = "Curtis"
    cy.get('.form-input')
      .type(name)
    cy.get('.submit-btn').click()
    cy.get('.order-list').should('include.text', 'Nothing selected')
  })

  it('should not allow the user to submit an order if a name has not been entered', () => {
    cy.get('.beans').click()
    cy.get('.steak').click()
    cy.get('.lettuce').click()
    cy.get('.submit-btn').click()
    cy.get('.order-list').should('include.text', 'Nothing selected')
  })

})