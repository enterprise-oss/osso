describe("EnterpriseAccounts", () => {
  describe("with an Admin user", () => {
    before(() => {
      cy.login("admin@saas.com", "admin");
    });

    it("can create an enterprise account", () => {
      cy.visit("/admin/enterprise");
      cy.get("button#addNew").click();
      cy.get("input#domain").type("foo.com");
      cy.get("input#name").type("Foo");
      cy.contains("OK").click();
      cy.get("table tr").last().get("td").contains("Foo").click();
      cy.url().should("include", "/enterprise/foo.com");
    });
  });
});
