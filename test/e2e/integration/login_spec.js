/// <reference types="Cypress" />

describe("/login behaviour", () => {
  "use strict";

  before(() => {
    cy.dbReset();
  });

  afterEach(() => {
    cy.visitPage("/logout");
  });

  beforeEach(() => {
    cy.visitPage("/login");
  });

  it("should have tutorial Guide link", () => {
    cy.get("a[href='/tutorial']")
      .should("have.attr", "target", "_blank")
      .and("be.visible");
  });

  it("Should open the tutorial in another tab", () => {
    cy.get("a[href='/tutorial']").then(function ($a) {
      const href =
      $a.prop("href");
      cy.visit(href);
      cy.url().should("include", "tutorial");
    });
  });

  it("should have admin user able to login", () => {
    cy.fixture("users/admin.json").as("admin");
    cy.get("@admin").then(admin => {
      cy.get("#userName").type(admin.user);
      cy.get("#password").type(admin.pass);
      cy.get("[type='submit']").click();
      cy.url().should("include", "benefits");
    });
  });

  it("should have non-admin user able to login", () => {
    cy.fixture("users/user.json").as("user");
    cy.get("@user").then(user => {
      cy.get("#userName").type(user.user);
      cy.get("#password").type(user.pass);
      cy.get("[type='submit']").click();
      cy.url().should("include", "dashboard");
    });
  });

  it("should reject wrong password", () => {
    cy.fixture("users/user.json").as("user");
    cy.get("@user").then(user => {
      cy.get("#userName").type(user.user);
      cy.get("#password").type("TO BE REJECTED");
      cy.get("[type='submit']").click();

      cy.url().should("include", "login");

      cy.get(".alert-danger")
        .contains("Invalid password")
        .and("be.visible");
    });
  });

  it("should reject wrong username", () => {
    cy.fixture("users/user.json").as("user");
    cy.get("@user").then(user => {
      cy.get("#userName").type("INVENTED");
      cy.get("#password").type(user.pass);
      cy.get("[type='submit']").click();

      cy.url().should("include", "login");

      cy.get(".alert-danger")
        .contains("Invalid username")
        .and("be.visible");
    });
  });

  it("should have new user/ sign up link", () => {
    cy.get("a[href='/signup']")
      .and("be.visible");
  });

  it("Should redirect to the signup", () => {
    cy.get("a[href='/signup']").click();
    cy.url().should("include", "signup");
  });
});
