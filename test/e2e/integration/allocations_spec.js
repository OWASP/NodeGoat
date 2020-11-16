/// <reference types="Cypress" />

describe('/allocations behaviour', () => {
  before(() => {
    cy.dbReset()
  })

  afterEach(() => {
    cy.visitPage('/logout')
  })

  it('Should redirect if the user has not logged in', () => {
    cy.visitPage('/allocations/1')
    cy.url().should('include', 'login')
  })

  it('Should be accesible for a logged user', () => {
    cy.userSignIn()
    cy.visitPage('/allocations/1')
    cy.url().should('include', 'allocations')
  })

  it('Should be an input', () => {
    cy.userSignIn()
    cy.visitPage('/allocations/1')
    cy.get('input[name="threshold"]')
  })

  it('Should redirect the user', () => {
    const threshold = 2
    cy.userSignIn()
    cy.visitPage('/allocations/1')

    cy.get('input[name="threshold"]')
      .clear()
      .type(threshold)

    cy.get('button[type="submit"]')
      .click()

    cy.location().should((loc) => {
      expect(loc.search).to.eq(`?threshold=${threshold}`)
      expect(loc.pathname).to.eq('/allocations/1')
    })
  })
})
