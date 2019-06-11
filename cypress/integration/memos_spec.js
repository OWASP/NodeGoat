const {port, hostName} = require('../../config/env/all')
const {user, admin} = require('../../config/env/e2e_test').users

describe('/memos behaviour', () => {

    it('Should redirect if the user has not logged in', () => {
        cy.visit(`http://${hostName}:${port}/memos`)
        cy.url().should('include', 'login')
    })

    it('Should be accesible if the user is an admin', () => {
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/memos`)
        cy.url().should('include', 'memos')
    })

    it('Should be accesible if the user is not an admin', () => {
        cy.signIn(user.user, user.pass)
        cy.visit(`http://${hostName}:${port}/memos`)
        cy.url().should('include', 'memos')
    })

    it('Should be a textarea', () => {
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/memos`)
        cy.get('textarea[name="memo"]')

    })

    it('Should memo be generated', ()=>{
        const text = "Hello World!";

        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/memos`)
        cy.get('textarea[name="memo"]')
            .clear()
            .type(text)

        cy.get('button[type="submit"]')
        .click()

        cy.url().should('eq', `http://${hostName}:${port}/memos`)

        cy.get('.panel-body > p')
            .should('be.visible')
            .contains(text)
    })

})