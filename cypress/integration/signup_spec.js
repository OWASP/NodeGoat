const {port, hostName} = require('../../config/env/all')
const {newUser} = require('../../config/env/e2e_test').users

describe('/signup behaviour', () => {

    it('Should not redirect if the user has not logged in', () => {
        cy.visit(`http://${hostName}:${port}/signup`)
        cy.url().should('include', 'signup')
    })

    it('Should not redirect if the user has logged in', () => {
        cy.visit(`http://${hostName}:${port}/signup`)
        cy.url().should('include', 'signup')
    })

    it('Should be a form with inputs', () => {
        cy.visit(`http://${hostName}:${port}/signup`)
        cy.get('form[role="form"]')
            .find('input')
            .should('have.length', 7)
    })

    it('Should new user be added to the system', ()=>{
        cy.visit(`http://${hostName}:${port}/signup`)
        
        cy.get('#userName')
        .clear()
        .type(newUser.user)

        cy.get('#firstName')
        .clear()
        .type(newUser.firstName)

        cy.get('#lastName')
        .clear()
        .type(newUser.lastName)

        cy.get('#password')
        .clear()
        .type(newUser.pass)

        cy.get('#verify')
        .clear()
        .type(newUser.pass)
      
      cy.get('button[type="submit"]')
          .first()
          .click()

        cy.get('.alert-danger').should('not.be.visible')
      
    })

    it('Should new user be able to login in the system', () => {
        cy.signIn(newUser.user, newUser.pass)
        cy.url().should('eq', `http://${hostName}:${port}/dashboard`)
    })
})
