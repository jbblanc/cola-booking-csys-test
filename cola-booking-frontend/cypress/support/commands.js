// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const base_url = Cypress.env("base_url");
const api_url = Cypress.env("api_url");
const path_signin = Cypress.env("path_signin");
const path_my_reservations = Cypress.env("path_my_reservations");
const path_home = Cypress.env("path_my_reservations");
const account_default_password = Cypress.env("ACCOUNT_DEFAULT_PASSWORD");// should come from .env or OS-level

// Checks a given link to make sure it has the right label AND the correct href (partial) value
Cypress.Commands.add(
	"checkLink",
	(domPath, linkLabel, urlPathToCheck) => {
		if (linkLabel) {
			cy.get(domPath)
				.contains(linkLabel)
				.should("have.attr", "href", urlPathToCheck);
		} else {
			cy.get(domPath).should(
				"have.attr",
				"href",
				urlPathToCheck
			);
		}
	}
);

// Checks a given link to make sure it has the correct href (partial) value
Cypress.Commands.add("linkIsPresent", (domPath, urlPathToCheck) => {
	cy.get(domPath).should("have.attr", "href", urlPathToCheck);
});

// Clicks on a given link to navigates to a URL
Cypress.Commands.add("navigateTo", (linkDomPath, urlPathToCheck) => {
	cy.get(linkDomPath).click();
	cy.url().should("include", urlPathToCheck);
});

// Checks wether a component is visible on screen
Cypress.Commands.add("isVisible", (domPath) => {
	cy.get(domPath).should("be.visible");
});

// Checks wether a component is NOT visible on screen
Cypress.Commands.add("isNotVisible", (domPath) => {
	cy.get(domPath).should("not.be.visible");
});

// Fills in a input or textarea with the exact text
Cypress.Commands.add("fillIn", (domPath, text) => {
	cy.get(domPath).clear({ force: true }).type(text);
});

// Checks an input text value
Cypress.Commands.add("inputHasValue", (inputDomPath, text) => {
	cy.get(inputDomPath).should("have.value", text);
});

// Performs a login as a user using login info
Cypress.Commands.add("login", (email) => {
	cy.visit(base_url);
	// eslint-disable-next-line cypress/no-unnecessary-waiting
	cy.wait(2000); //wihtout a little wait, inputs might appear disabled or unreachable on signin page
	cy.get("input[data-cy=input_signin_email]").clear().type(email);
	cy.get("input[data-cy=input_signin_password]").clear().type(account_default_password);
	cy.get("[data-cy=btn_signin_submit]").click();
	cy.url().should("include", path_home);
});

// Performs a logout from app
Cypress.Commands.add("logout", () => {
	cy.log("I logout from application");
	cy.wait(1000);
	cy.get("[data-cy=btn_logout]").click();
	cy.url().should("include", path_signin);
	cy.clearCookies();
});
