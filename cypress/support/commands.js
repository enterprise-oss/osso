import jwt from "jsonwebtoken";

Cypress.Commands.add("login", (email, scope) => {
  const token = jwt.sign(
    {
      email,
      scope,
      id: "fake-id",
      oauth_client_id: "production",
    },
    Cypress.env("JWT_HMAC_SECRET")
  );

  cy.visit(`/admin/login?admin_token=${token}`);
});
