/// <reference types="Cypress" />

describe("/research behaviour", () => {
  "use strict";

  afterEach(() => {
    cy.visitPage("/logout");
  });

  it("Should redirect if the user has not logged in", () => {
    cy.visitPage("/research");
    cy.url().should("include", "login");
  });

  it("Should be accesible for a logged user", () => {
    cy.userSignIn();
    cy.visitPage("/research");
    cy.url().should("include", "research");
  });

  it("Should be a form with an input", () => {
    cy.userSignIn();
    cy.visitPage("/research");
    cy.get("form[role='search']")
      .find("input");
  });

  it("Should have an input text as a valid stock symbol", () => {
    const stockSymbol = "AAPL";
    cy.userSignIn();
    cy.visitPage("/research");
    cy.get(".form-control")
      .clear()
      .type(stockSymbol);

    cy.get("form")
      .should("have.attr", "action", "/research")
      .invoke("attr", "action", "/skip");

    cy.get("button[type='submit']")
      .first()
      .click();

    cy.url().should("include", "https%3A%2F%2Ffinance.yahoo.com%2Fquote%2F&symbol=AAPL");
  });
});
