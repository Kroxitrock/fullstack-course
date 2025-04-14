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
      let result = '';
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
      const title = generateString(10)
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

    it('A blog can be deleted', () => {
      const title = generateString(10)
      cy.get('#new-blog-button').click()
      cy.get('#title').type(title)
      cy.get('#author').type('Author One')
      cy.get('#url').type('https://example.com')
      cy.get('#create-button').click()

      cy.get(`#view-button-${title}`).click();
      cy.contains('remove').click()

      cy.on('window:confirm', () => true)
      cy.contains('removed')
    })

    it(`A blog from another user can't be deleted`, () => {
      const title = generateString(10)
      cy.get('#new-blog-button').click()
      cy.get('#title').type(title)
      cy.get('#author').type('Author One')
      cy.get('#url').type('https://example.com')
      cy.get('#create-button').click()

      cy.get('#logout-button').click()

      cy.get("#username").type('user2')
      cy.get("#password").type('password2')
      cy.get('#login-button').click()

      cy.get(`#view-button-${title}`).click();
      cy.contains('remove').should('not.exist')

    });

    it('Blogs are ordered by likes', () => {
      cy.get('.blog').then((blogs) => {
        let likeTimes = 0;

        for (let i = blogs.length - 1; i > 0; i--) {
            const blog = blogs[i];

            const newLikes = parseInt(blog.className.match(/blog-(\d+)/)[1], 10);
            console.log(`blog-${newLikes}`);
            cy.wrap(newLikes).should('be.gte', likeTimes);
            likeTimes = newLikes;
        }
      })
    });
  })
})