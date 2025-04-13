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

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get("#username").type('user1')
      cy.get("#password").type('password1')
      cy.get('#login-button').click()

      cy.contains('User One logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get("#username").type('user1')
      cy.get("#password").type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })
})