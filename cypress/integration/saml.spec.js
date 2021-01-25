describe("SAML Logins", () => {
  it("can perform SP initiated login via hosted login and Mock IDP", () => {
    cy.visit("http://localhost:4567/");
    cy.contains("Hosted Sign In").click();

    cy.get("input#email-input").type("user@example.com");
    cy.get("input#hosted-login-button").click();

    cy.get("input[name='email']").type("user@example.com");
    cy.get("input[name='password']").type("password");

    cy.get("input#hosted-login-button").click();

    cy.contains('"email": "user@example.com"');
  });

  it("can perform SP initiated login with an email address and Mock IDP", () => {
    cy.visit("http://localhost:4567/");
    cy.get("input#email").type("user@example.com");
    cy.get("#sign-in-btn").click();

    cy.get("input[name='email']").type("user@example.com");
    cy.get("input[name='password']").type("password");

    cy.get("input#hosted-login-button").click();

    cy.contains('"email": "user@example.com"');
  });

  it("can perform SP initiated login with an email address and Mock IDP", () => {
    cy.visit("http://localhost:4567/");
    cy.get("input#domain").type("example.com");
    cy.get("#sign-in-btn").click();

    cy.get("input[name='email']").type("user@example.com");
    cy.get("input[name='password']").type("password");

    cy.get("input#hosted-login-button").click();

    cy.contains('"email": "user@example.com"');
  });
});
