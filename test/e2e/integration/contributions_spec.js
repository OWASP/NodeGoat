/// <reference types="Cypress" />

describe('/contributions behaviour', () => {
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
    cy.visitPage('/contributions')
    cy.url().should('include', 'login')
  })

  it('Should be accesible if the user is an admin', () => {
    cy.adminSignIn()
    cy.visitPage('/contributions')
    cy.url().should('include', 'contributions')
  })

  it('Should be accesible if the user is not an admin', () => {
    cy.userSignIn()
    cy.visitPage('/contributions')
    cy.url().should('include', 'contributions')
  })

  it('Should be a table with several inputs', () => {
    cy.adminSignIn()
    cy.visitPage('/contributions')
    cy.get('table')
      .find('input')
      .should('have.length', 3)
  })

  it('Should input be modified', () => {
    const value = '12'
    cy.adminSignIn()
    cy.visitPage('/contributions')
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

    cy.url().should('include', 'contributions')
  })
})
