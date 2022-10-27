describe("As an employee at Pepsi, I book a reservation using Room Schedule", () => {
  const path_room_schedule = Cypress.env("path_room_schedule");
  const accounts_fixture_file = "accounts.json";

  beforeEach(() => {
    cy.fixture(accounts_fixture_file).as("accounts");
  });

  it("I signin using Employee B at Pepsi account", function () {
    const account = this.accounts.filter(a => a.key === "employeeb-pepsi")[0];
    cy.login(account.account.profile.email);
  });

  it("I select room schedule in the menu", () => {
    cy.wait(1000);
    cy.navigateTo("[data-cy=btn_menu_room_schedule]", path_room_schedule);
  });

  it("Page contains the expected components", () => {
    cy.get("[data-cy=date_selector]").should("be.visible");
    cy.get("[data-cy=room_selector]").should("be.visible");
    cy.get("[data-cy=room_schedule]").should("be.visible");
    cy.get("[data-cy=room_schedule]>div").should(($scheduleSlots) => {
      expect($scheduleSlots).to.have.length(12);// from 8am to 7pm
    });
  });

  it("I select an available time slot for room and I book a reservation for this slot", () => {
    cy.get("[data-cy=btn_book_11am]").click();
    cy.wait(500);
    cy.get("[data-cy=reservation_card_11am]").should("be.visible");
  });

  it("I cancel my reservation", () => {
    cy.get("[data-cy=btn_cancel_11am]").click();
    cy.wait(500);
    cy.get("[data-cy=btn_book_11am]").should("be.visible");
  });

  after(() => {
    cy.logout();
  });

});
