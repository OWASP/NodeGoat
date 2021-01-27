/// <reference types="Cypress" />

describe("/tutorial behaviour", () => {
  "use strict";

  it("Should have all the links in the side nav", () => {
    cy.visitPage("/tutorial");
    cy.url().should("include", "tutorial");
    cy.get(".side-nav")
      .should("be.visible")
      .find("a")
      .should("have.length", 12);
  });

  it("Should exists /tutorial/a1", () => {
    cy.visitPage("/tutorial/a1");
    cy.url().should("include", "a1");
  });

  it("Should exists /tutorial/a2", () => {
    cy.visitPage("/tutorial/a2");
    cy.url().should("include", "a2");
  });

  it("Should exists /tutorial/a3", () => {
    cy.visitPage("/tutorial/a3");
    cy.url().should("include", "a3");
  });
  it("Should exists /tutorial/a4", () => {
    cy.visitPage("/tutorial/a4");
    cy.url().should("include", "a4");
  });

  it("Should exists /tutorial/a5", () => {
    cy.visitPage("/tutorial/a5");
    cy.url().should("include", "a5");
  });

  it("Should exists /tutorial/a6", () => {
    cy.visitPage("/tutorial/a6");
    cy.url().should("include", "a6");
  });

  it("Should exists /tutorial/a7", () => {
    cy.visitPage("/tutorial/a7");
    cy.url().should("include", "a7");
  });

  it("Should exists /tutorial/a8", () => {
    cy.visitPage("/tutorial/a8");
    cy.url().should("include", "a8");
  });

  it("Should exists /tutorial/a9", () => {
    cy.visitPage("/tutorial/a9");
    cy.url().should("include", "a9");
  });

  it("Should exists /tutorial/a10", () => {
    cy.visitPage("/tutorial/a10");
    cy.url().should("include", "a10");
  });

  it("Should exists /tutorial/redos", () => {
    cy.visitPage("/tutorial/redos");
    cy.url().should("include", "redos");
  });

  it("Should exists /tutorial/ssrf", () => {
    cy.visitPage("/tutorial/ssrf");
    cy.url().should("include", "ssrf");
  });
});
