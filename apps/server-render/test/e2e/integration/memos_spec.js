/// <reference types="Cypress" />

describe('/memos behaviour', () => {
    before(() => {
        cy.dbReset()
    })

    after(() => {
        cy.dbReset()
    })

    afterEach(() => {
        cy.visitPage('/logout')
    })

    it('Should redirect if the user has not logged in', () => {
        cy.visitPage('/memos')
        cy.url().should('include', 'login')
    })

    it('Should be accesible for a logged user', () => {
        cy.userSignIn()
        cy.visitPage('/memos')
        cy.url().should('include', 'memos')
    })

    it('Should exists a textarea', () => {
        cy.userSignIn()
        cy.visitPage('/memos')
        cy.get('textarea[name="memo"]')
    })

    it('Should memo be generated', () => {
        const text = 'Hello World!'

        cy.userSignIn()
        cy.visitPage('/memos')
        cy.get('textarea[name="memo"]')
            .clear()
            .type(text)

        cy.get('button[type="submit"]')
            .click()

        cy.url().should('include', 'memos')

        cy.get('.panel-body > p')
            .should('be.visible')
            .contains(text)
    })

    it('Should demonstrate A9', () => {
        const label = 'marked XSS'
        const text = `[${label}](javascript&#58this;alert(1&#41;)`

        cy.userSignIn()
        cy.visitPage('/memos')
        cy.get('textarea[name="memo"]')
            .clear()
            .type(text)

        cy.get('button[type="submit"]')
            .click()

        cy.url().should('include', 'memos')

        cy.get('.panel-body > p > a')
            .contains(label)
            .should('be.visible')
            .should('have.attr', 'href', 'javascript:this;alert(1)')
    })
})
