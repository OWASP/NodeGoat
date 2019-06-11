describe('/profile behaviour', () => {
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
    cy.visitPage('/profile')
    cy.url().should('include', 'login')
  })

  it('Should be accesible if the user is an admin', () => {
    cy.adminSignIn()
    cy.visitPage('/profile')
    cy.url().should('include', 'profile')
  })

  it('Should be accesible if the user is not an admin', () => {
    cy.userSignIn()
    cy.visitPage('/profile')
    cy.url().should('include', 'profile')
  })

  it('Should be a form with inputs', () => {
    cy.adminSignIn()
    cy.visitPage('/profile')
    cy.get('form[role="form"]')
      .find('input')
      .should('have.length', 8)
  })

  it('Should first name be modified', () => {
    const newName = 'My new name!'
    const bankRouting = '0198212#'
    cy.adminSignIn()
    cy.visitPage('/profile')
    cy.get('#firstName')
      .clear()
      .type(newName)

    cy.get('#bankRouting')
      .clear()
      .type(bankRouting)

    cy.get('button[type="submit"]')
      .first()
      .click()

    cy.url().should('include', 'profile')

    cy.get('.alert-success')
      .should('be.visible')

    cy.get('#firstName')
      .invoke('val')
      .should('eq', newName)
  })

  it('Google search this profile by name', () => {
    cy.adminSignIn()
    cy.visitPage('/profile')

    cy.get('form[role="form"] a')
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'google')
      .should('have.attr', 'target', '_blank')
  })
})
