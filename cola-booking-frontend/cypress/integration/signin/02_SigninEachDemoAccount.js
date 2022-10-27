describe("All demo accounts can signin on the application", () => {
  const path_home = Cypress.env("path_my_reservations");
  const accounts_fixture_file = "accounts.json";

  beforeEach(() => {
    cy.fixture(accounts_fixture_file).as("accounts");
  });

  it("I signin using admin account", function () {
    const account = this.accounts.filter(a => a.key === "admin")[0];
    cy.login(account.account.profile.email);
  });

  it("I signin using Employee A at Pepsi account", function () {
    const account = this.accounts.filter(a => a.key === "employeea-pepsi")[0];
    cy.login(account.account.profile.email);
  });

  it("I signin using Employee B at Pepsi account", function () {
    const account = this.accounts.filter(a => a.key === "employeeb-pepsi")[0];
    cy.login(account.account.profile.email);
  });

  it("I signin using Employee A at Coke account", function () {
    const account = this.accounts.filter(a => a.key === "employeea-coke")[0];
    cy.login(account.account.profile.email);
  });

  it("I signin using Employee B at Coke account", function () {
    const account = this.accounts.filter(a => a.key === "employeeb-coke")[0];
    cy.login(account.account.profile.email);
  });

  afterEach(() => {
    cy.logout();
  });

});
