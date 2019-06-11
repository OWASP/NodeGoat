const {port, hostName} = require('../../config/env/all')
const {user, admin} = require('../../config/env/e2e_test').users

describe('/allocations behaviour', () => {

    it('Should redirect if the user has not logged in', () => {
        cy.visit(`http://${hostName}:${port}/allocations/1`)
        cy.url().should('include', 'login')
    })

    it('Should be accesible if the user is an admin', () => {
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/allocations/1`)
        cy.url().should('include', 'allocations')
    })

    it('Should be accesible if the user is not an admin', () => {
        cy.signIn(user.user, user.pass)
        cy.visit(`http://${hostName}:${port}/allocations/1`)
        cy.url().should('include', 'allocations')
    })

    it('Should be an input', () => {
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/allocations/1`)
        cy.get('input[name="threshold"]')

    })

    it('Should redirect the user', ()=>{
        const threshold = 2;
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/allocations/1`)
        cy.get('input[name="threshold"]')
        .clear()
        .type(threshold)

        cy.get('button[type="submit"]')
        .click()

        cy.url().should('eq', `http://${hostName}:${port}/allocations/1?threshold=${threshold}`)
    })

})