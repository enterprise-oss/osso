import jwt from "jsonwebtoken";

Cypress.Commands.add("login", (email, scope) => {
  const token = jwt.sign(
    {
      email,
      scope,
      id: "fake-id",
    },
    Cypress.env("JWT_HMAC_SECRET")
  );

  cy.visit(`/admin?admin_token=${token}`);
});
