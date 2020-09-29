describe("Customer Identity Providers", () => {
  describe("an Admin user", () => {
    beforeEach(() => {
      cy.login("admin@example.com", "admin");
      cy.visit("/admin/enterprise/customer.com");
    });

    it("can add a new Okta provider", () => {
      cy.contains("Actions").click();
      cy.contains("Add new IDP").click();

      cy.contains("Okta").click();
      cy.contains("Next").click();

      cy.contains("Congratulations");
    });

    it("can add a new Azure provider", () => {
      cy.contains("Actions").click();
      cy.contains("Add new IDP").click();

      cy.contains("Azure").click();
      cy.contains("Next").click();

      cy.contains("Congratulations");
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
