describe('/dashboard behaviour', () => {
  afterEach(() => {
    cy.visitPage('/logout')
  })

  it('Should redirect if the user has not logged in', () => {
    cy.visitPage('/dashboard')
    cy.url().should('include', 'login')
  })

  it('Should be accesible if the user is an admin', () => {
    cy.adminSignIn()
    cy.visitPage('/dashboard')
    cy.url().should('include', 'dashboard')
  })

  it('Should be accesible if the user is not an admin', () => {
    cy.userSignIn()
    cy.visitPage('/dashboard')
    cy.url().should('include', 'dashboard')
  })

  it('Should display information', () => {
    cy.adminSignIn()
    cy.visitPage('/dashboard')
    cy.url().should('include', 'dashboard')
    cy.get('.panel')
      .should('be.visible')
      .should('have.length', 5)
  })

  it('Should have a link to /contributions', () => {
    cy.adminSignIn()
    cy.visitPage('/dashboard')
    cy.url().should('include', 'dashboard')
    cy.get('.panel a')
      .first()
      .should('have.attr', 'href', '/contributions')
  })
})
