describe('/research behaviour', () => {
  
    afterEach(() => {
        cy.visitPage('/logout')
    })

    it('Should redirect if the user has not logged in', () => {
      cy.visitPage('/research')
      cy.url().should('include', 'login')
    })
  
    it('Should be accesible if the user is an admin', () => {
      cy.adminSignIn()
      cy.visitPage('/research')
      cy.url().should('include', 'research')
    })
  
    it('Should be accesible if the user is not an admin', () => {
      cy.userSignIn()
      cy.visitPage('/research')
      cy.url().should('include', 'research')
    })

    it('Should be a form with an input', () => {
        cy.userSignIn()
        cy.visitPage('/research')
        cy.get('form[role="search"]')
          .find('input')
    })

    it.skip('Should have an input text as a valid stock symbol', () => {
        const stockSymbol = "AAPL"
        cy.adminSignIn()
        cy.visitPage('/research')
        cy.get('.form-control')
          .clear()
          .type(stockSymbol)
  

        cy.get('form').then(form$ => {
            form$.on('submit', e => {
                e.preventDefault()
            })
        })

        cy.get('button[type="submit"]')
          .first()
          .click()

        cy.get('form')
          .should('have.attr', 'method', 'get')
          .should('have.attr', 'action', '/research')
        
        cy.get('input[name="url"]')
          .should('have.attr', 'value', 'https://finance.yahoo.com/quote/')

        cy.get('input[name="symbol"]')
          .should('have.attr', 'value', stockSymbol)

      })
})

