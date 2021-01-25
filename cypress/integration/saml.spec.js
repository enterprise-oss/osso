describe("SAML Logins", () => {
  it("can perform SP initiated login via hosted login and Mock IDP", () => {
    // cy.visit("/oauth/authorize", {
    //   qs: {
    //     client_id: "demo-client-id",
    //     redirect_uri: "http://localhost:9292/health",
    //     response_type: "code",
    //   },
    // });

    cy.visit("http://localhost:4567/");
    cy.contains("Hosted Sign In").click();

    cy.get("input#email-input").type("user@example.com");
    cy.get("input#hosted-login-button").click();

    cy.get("input[name='email']").type("user@example.com");
    cy.get("input[name='password']").type("password");

    cy.get("input#hosted-login-button").click();

    cy.contains("ok");
  });
});
