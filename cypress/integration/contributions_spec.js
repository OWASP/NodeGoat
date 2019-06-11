const {port, hostName} = require('../../config/env/all')
const {user, admin} = require('../../config/env/e2e_test').users

describe('/contributions behaviour', () => {

    it('Should redirect if the user has not logged in', () => {
        cy.visit(`http://${hostName}:${port}/contributions`)
        cy.url().should('include', 'login')
    })

    it('Should be accesible if the user is an admin', () => {
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/contributions`)
        cy.url().should('include', 'contributions')
    })

    it('Should be accesible if the user is not an admin', () => {
        cy.signIn(user.user, user.pass)
        cy.visit(`http://${hostName}:${port}/contributions`)
        cy.url().should('include', 'contributions')
    })

    it('Should be a table with several inputs', () => {
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/contributions`)
        cy.get('table')
        .find('input')
        .should('have.length', 3)
    })

    it('Should input be modified', ()=>{
        const value = "12";
        cy.signIn(admin.user, admin.pass)
        cy.visit(`http://${hostName}:${port}/contributions`)
        cy.get('table')
        .find('input')
        .first()
        .clear()
        .type(value)

        cy.get('button[type="submit"]')
        .click()

        cy.get('tbody > tr > td')
        .eq(1) 
        .contains(`${value} %`)
        
        cy.get('.alert-success')
        .should('be.visible')

        cy.url().should('eq', `http://${hostName}:${port}/contributions`)
    })

})