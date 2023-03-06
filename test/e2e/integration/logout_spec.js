/// <reference types="Cypress" />

describe("/logout behaviour", () => {
  "use strict";

  before(() => {
    cy.dbReset();
  });

  it("Should redirect if the user has not logged in", () => {
    cy.visitPage("/logout");
    cy.url().should("include", "login");
  });

  it("Should be working if the user is an admin", () => {
    cy.adminSignIn();
    cy.visitPage("/logout");
    cy.url().should("include", "login");
    cy.visitPage("/dashboard");
    cy.url().should("include", "login");
  });

  it("Should be working if the user is not an admin", () => {
    cy.userSignIn();
    cy.visitPage("/logout");
    cy.url().should("include", "login");
    cy.visitPage("/dashboard");
    cy.url().should("include", "login");
  });
});
