describe("Signin page is accessible and properly displayed", () => {
  const base_url = Cypress.env("base_url");
  const pass = Cypress.env("ACCOUNT_DEFAULT_PASSWORD");
  const path_signin = Cypress.env("path_signin");
  const path_signup = Cypress.env("path_signup");

  it("I navigate to signin page", () => {
    cy.visit(base_url);
    cy.url().should("include", path_signin);
  });

  it("Signin form is visible", () => {
    cy.get("[data-cy=form_signin]").should("be.visible");
  });

  it("Register link is acessible", () => {
    cy.checkLink("[data-cy=link_register]", "Register here", path_signup);
  });

});
