/// <reference types="Cypress" />

describe('/learn behaviour', () => {
  afterEach(() => {
    cy.visitPage('/logout')
  })

  it('Should redirect if the user has not logged in', () => {
    cy.visitPage('/learn?url=/dashboard')
    cy.url().should('include', 'login')
  })

  it('Should be accesible for a logged user', () => {
    cy.userSignIn()
    cy.visitPage('/learn?url=/dashboard')
    cy.url().should('include', 'dashboard')
  })
})
