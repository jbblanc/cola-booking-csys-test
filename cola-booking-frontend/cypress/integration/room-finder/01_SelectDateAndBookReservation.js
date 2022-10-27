describe("As an employee at Coke, I book a reservation using Room Finder", () => {
  const path_room_finder = Cypress.env("path_room_finder");
  const path_my_reservations = Cypress.env("path_my_reservations");
  const accounts_fixture_file = "accounts.json";

  beforeEach(() => {
    cy.fixture(accounts_fixture_file).as("accounts");
  });

  it("I signin using Employee A at Coke account", function () {
    const account = this.accounts.filter(a => a.key === "employeea-coke")[0];
    cy.login(account.account.profile.email);
  });

  it("I select room finder in the menu", () => {
    cy.wait(1000);
    cy.navigateTo("[data-cy=btn_menu_room_finder]", path_room_finder);
  });

  it("Page contains the expected components and show a list of available rooms", () => {
    cy.get("[data-cy=time_slot_selector]").should("be.visible");
    cy.get("[data-cy=available_rooms_list]").should("be.visible");
    /*cy.get("[data-cy=available_rooms_list]>div").should(($availableRooms) => {
      expect($availableRooms).to.have.length.of.at.most(4);
    });*/
  });

  it("I choose an available room and I book a reservation for this slot", () => {
    cy.get("[data-cy=btn_book_C05]").click();
    cy.wait(500);
    // we should be redirected automatically to 'my-reservations'
    cy.url().should("include", path_my_reservations);
    cy.get("[data-cy=reservation_card_8am]").should("be.visible");
  });

  it("I cancel my reservation", () => {
    cy.get("[data-cy=btn_cancel_8am]").click();
    cy.wait(500);
  });

  after(() => {
    cy.logout();
  });

});
