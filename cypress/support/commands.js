const {port, hostName} = require('../../config/env/all')

Cypress.Commands.add('signIn', (usr, pw) => {
    cy.visit(`http://${hostName}:${port}/login`)
    cy.get("#userName").type(usr)
    cy.get("#password").type(pw)
    cy.get('[type="submit"]').click()
})
