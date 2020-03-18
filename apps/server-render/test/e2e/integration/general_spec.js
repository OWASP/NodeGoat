/// <reference types="Cypress" />

describe('General behaviour', () => {
  beforeEach(() => {
    cy.adminSignIn()
    cy.visitPage('/')
  })

  afterEach(() => {
    cy.visitPage('/logout')
  })

  it('should have all the links in the side menu', () => {
    cy.get('#dashboard-menu-link')
      .should('be.visible')
      .should('have.attr', 'href', '/')

    cy.get('#contributions-menu-link')
      .should('be.visible')
      .should('have.attr', 'href', '/contributions')

    cy.get('#allocations-menu-link')
      .should('be.visible')
      .should('have.attr', 'href', '/allocations/1')

    cy.get('#memos-menu-link')
      .should('be.visible')
      .should('have.attr', 'href', '/memos')

    cy.get('#profile-menu-link')
      .should('be.visible')
      .should('have.attr', 'href', '/profile')

    cy.get('#learn-menu-link')
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', '/learn?url=https://www.khanacademy.org/economics-finance-domain/core-finance/investment-vehicles-tutorial/ira-401ks/v/traditional-iras')

    cy.get('#research-menu-link')
      .should('be.visible')
      .should('have.attr', 'href', '/research')

    cy.get('#logout-menu-link')
      .should('be.visible')
      .should('have.attr', 'href', '/logout')
  })

  it('should have a profile menu', () => {
    cy.get('.user-dropdown a')
      .eq(0)
      .invoke('text')
      .should('eq', ' Node Goat Admin ')

    cy.get('.user-dropdown a')
      .eq(1)
      .should('have.attr', 'href', '/profile')
      .invoke('text')
      .should('eq', ' Profile')

    cy.get('.user-dropdown a')
      .eq(2)
      .should('have.attr', 'href', '/logout')
      .invoke('text')
      .should('eq', ' Log Out')
  })

  it('should manage 404', () => {
    cy.visitPage('/invented', { failOnStatusCode: false })
    cy.get('body')
      .invoke('text')
      .should('eq', '\nCannot GET /invented\n\n\n')
  })
})
