
const {port, hostName} = require('../../config/env/all')
const {user, admin} = require('../../config/env/e2e_test').users
describe('/login behaviour', () => {
  
  beforeEach(function () {
    cy.visit(`http://${hostName}:${port}/login`)
  })

  it('should have tutorial Guide link', () => {
    cy.get("a[href='/tutorial']" )
    .should('have.attr', 'target', '_blank') 
    .and('be.visible')
  })

  it('Should open the tutorial in another tab', () => {
    cy.get("a[href='/tutorial']" ).then(function($a){
      const href = 
      $a.prop('href')
      cy.visit(href)
      cy.url().should('include', 'tutorial')
    })
  })


  it('should have admin user able to login', () => {
    cy.get("#userName").type(admin.user)
    cy.get("#password").type(admin.pass)
    cy.get('[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:4000/benefits')
  })

  it('should have non-admin user able to login', () => {
    cy.get("#userName").type(user.user)
    cy.get("#password").type(user.pass)
    cy.get('[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:4000/dashboard')
  }) 
  
  
  it('should reject wrong password', () => {
    cy.get("#userName").type(user.user)
    cy.get("#password").type("TO BE REJECTED")
    cy.get('[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:4000/login')
    cy.get(".alert-danger")
      .contains('Invalid password') 
      .and('be.visible')
  })  

  it('should reject wrong username', () => {
    cy.get("#userName").type("INVENTED")
    cy.get("#password").type(user.pass)
    cy.get('[type="submit"]').click()
    cy.url().should('eq', 'http://localhost:4000/login')
    cy.get(".alert-danger")
    .contains('Invalid username') 
    .and('be.visible')
  })  

  it('should have new user/ sign up link', () => {
    cy.get("a[href='/signup']" )
    .and('be.visible')
  })

  it('Should redirect to the signup', () => {
    cy.get("a[href='/signup']" ).click()
    cy.url().should('eq', 'http://localhost:4000/signup')
  })


})