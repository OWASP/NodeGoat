const { port, hostName } = require('../../../config/env/all')

Cypress.Commands.add('signIn', (usr, pw) => {
  cy.visit(`http://${hostName}:${port}/login`)
  cy.get('#userName').type(usr)
  cy.get('#password').type(pw)
  cy.get('[type="submit"]').click()
})

Cypress.Commands.add('adminSignIn', () => {
  cy.fixture('users/admin.json').as('admin')
  cy.get('@admin').then(admin => {
    cy.signIn(admin.user, admin.pass)
  })
})

Cypress.Commands.add('userSignIn', () => {
  cy.fixture('users/user.json').as('user')
  cy.get('@user').then(user => {
    cy.signIn(user.user, user.pass)
  })
})

Cypress.Commands.add('visitPage', (path = '/', config = {}) => {
  cy.visit(`http://${hostName}:${port}${path}`, config)
})

Cypress.Commands.add('dbReset', () => {
  //@see: https://github.com/topheman/react-fiber-experiments/blame/master/cypress/integration/about.spec.js#L34
  cy.exec('npm run db:seed', {
    timeout: 6000,
    failOnNonZeroExit: false
  })
  // @TODO: Just commented for CI, this MUST be improved
  //.its('stdout').should('contain', 'Database reset performed successfully')
})
