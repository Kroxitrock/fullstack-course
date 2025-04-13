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

  describe('When logged in', () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return result;
    }

    beforeEach(function() {
      cy.get("#username").type('user1')
      cy.get("#password").type('password1')
      cy.get('#login-button').click()
    })

    it('A blog can be created', () => {
      cy.get('#new-blog-button').click()
      cy.get('#title').type(generateString(10))
      cy.get('#author').type('Author One')
      cy.get('#url').type('https://example.com')
      cy.get('#create-button').click()

      cy.contains('A new blog Author One')
    })

    it('A blog can be liked', () => {
      cy.contains('new blog').click()
      const title = generateString(10).replace(' ', '')
      cy.get('#new-blog-button').click()
      cy.get('#title').type(title)
      cy.get('#author').type('Author One')
      cy.get('#url').type('https://example.com')
      cy.get('#create-button').click()

      cy.get(`#view-button-${title}`).click();
      cy.contains('0 like')
      cy.contains('like').click()

      cy.contains('1 like')
    })

  })
})