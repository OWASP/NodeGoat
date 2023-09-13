/// <reference types="Cypress" />

describe("/login behaviour", () => {
  "use strict";

  before(() => {
    cy.dbReset();
  });

  afterEach(() => {
    cy.visitPage("/logout");
  });

  it("Should redirect if the user has not logged in", () => {
    cy.visitPage("/benefits");
    cy.url().should("include", "login");
  });

  it("Should be accesible by default if the user is an admin", () => {
    cy.adminSignIn();
    cy.visitPage("/benefits");
    cy.url().should("include", "benefits");
  });

  it("Should be accesible if the user is not an admin", () => {
    cy.userSignIn();
    cy.visitPage("/benefits");
    cy.url().should("include", "benefits");
  });

  it("Should be a table with rows", () => {
    cy.adminSignIn();
    cy.visitPage("/benefits");
    cy.get("table tr");
  });

  it("Should data in the table be modified", () => {
    cy.adminSignIn();
    cy.visitPage("/benefits");
    cy.get("input[name='benefitStartDate'")
      .first()
      .type("2099-01-10");

    cy.get("button[type='submit']")
      .first()
      .click();

    cy.url().should("include", "benefits");
    cy.get("input[name='benefitStartDate'")
      .first()
      .invoke("val")
      .should("eq", "2099-01-10");
  });
});
