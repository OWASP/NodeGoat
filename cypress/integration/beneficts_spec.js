
const {port, hostName} = require('../../config/env/all')
const {user, admin} = require('../../config/env/e2e_test').users

describe('/login behaviour', () => {
    beforeEach(() => {
        cy.visit(`http://${hostName}:${port}/benefits`)
    })

    it('Should redirect if the user has not logged in', () => {
        cy.url().should('include', 'login')
    })

    it('Should be accesible by default if the user is an admin', () => {
        cy.signIn(admin.user, admin.pass)
        cy.url().should('include', 'benefits')
        cy.visit(`http://${hostName}:${port}/benefits`)
    })

    it('Should be accesible if the user is not an admin', () => {
        cy.signIn(user.user, user.pass)
        cy.url().should('include', 'dashboard')
        cy.visit(`http://${hostName}:${port}/benefits`)
        cy.url().should('include', 'benefits')
    })

    it('Should be a table with rows', () => {
        cy.signIn(admin.user, admin.pass)
        cy.get('table tr')
    })

    it('Should data in the table be modified', ()=>{
        cy.signIn(admin.user, admin.pass)
        cy.get('input[name="benefitStartDate"')
          .first()
          .type("2099-01-10")
        
        cy.get('button[type="submit"]')
            .first()
            .click()
        
        cy.url().should('include', 'benefits')
        cy.get('input[name="benefitStartDate"')
            .first()
            .invoke('val')
            .should("eq", "2099-01-10")
    })
})