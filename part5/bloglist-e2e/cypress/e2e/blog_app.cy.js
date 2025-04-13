describe('Blog App', () => {

  beforeEach(function() {
    cy.visit('http://localhost:5173/')
  })

  it('login form is shown', () => {
    cy.contains('login')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')
  })
})