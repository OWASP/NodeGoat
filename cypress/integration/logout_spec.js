const {port, hostName} = require('../../config/env/all')
const {user, admin} = require('../../config/env/e2e_test').users

describe('/logout behaviour', () => {

    it('Should redirect if the user has not logged in', () => {
        cy.visit(`http://${hostName}:${port}/logout`)
        cy.url().should('include', 'login')
    })

    it('Should be working if the user is an admin', () => {
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/logout`)
        cy.url().should('include', 'login')
        cy.visit(`http://${hostName}:${port}/dashboard`)
        cy.url().should('include', 'login')
    })

    it('Should be working if the user is not an admin', () => {
        cy.signIn(user.user, user.pass)
        cy.visit(`http://${hostName}:${port}/logout`)
        cy.url().should('include', 'login')
        cy.visit(`http://${hostName}:${port}/dashboard`)
        cy.url().should('include', 'login')
    })

})
