describe('/learn behaviour', () => {
  afterEach(() => {
    cy.visitPage('/logout')
  })

  it('Should redirect if the user has not logged in', () => {
    cy.visitPage('/learn?url=/dashboard')
    cy.url().should('include', 'login')
  })

  it('Should be accesible if the user is an admin', () => {
    cy.adminSignIn()
    cy.visitPage('/learn?url=/dashboard')
    cy.url().should('include', 'dashboard')
  })

  it('Should be accesible if the user is not an admin', () => {
    cy.userSignIn()
    cy.visitPage('/learn?url=/dashboard')
    cy.url().should('include', 'dashboard')
  })
})
