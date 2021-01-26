describe("Customer Identity Providers", () => {
  describe("an Admin user", () => {
    beforeEach(() => {
      cy.login("admin@saas.co");
      cy.visit("/admin/enterprise/example.com");
    });

    it("can add a new Okta provider", () => {
      cy.contains("Actions").click();
      cy.contains("Add new IDP").click();

      cy.get(".ant-form-item").contains("Okta").click();

      cy.get("input#oauthClientId").click();
      cy.get(".ant-select-item div").contains("Production").click();

      cy.contains("Next").click();

      cy.contains("Custom PDF");
    });

    it("can add a new Azure provider", () => {
      cy.contains("Actions").click();
      cy.contains("Add new IDP").click();

      cy.get(".ant-form-item").contains("Azure").click();

      cy.get("input#oauthClientId").click();
      cy.get(".ant-select-item div").contains("Production").click();

      cy.contains("Next").click();

      cy.contains("Custom PDF");
    });

    xit("can download the PDF setup docs", () => {
      cy.task("allowDownloads");

      cy.contains("Download").click();
    });

    it("can complete configuration", () => {
      cy.contains("Complete").click();
    });
  });
});
