Cypress.Commands.add("login", (email) => {
  cy.visit(`/login`);
  cy.get("input#login").type(email);
  cy.get("input#password").type("password");
  cy.get("button").contains("Login").click();
});

Cypress.Commands.add("getDownload", (filepath) => {
  cy.readFile(`downloads/${filepath}`);
});
