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

      cy.get("input#osso-okta-acs-url")
        .invoke("val")
        .then((acsUrl) => {
          expect(acsUrl).to.match(/.*\/auth\/saml\/.*\/callback/);
        });

      cy.get("input#osso-okta-entity-id")
        .invoke("val")
        .then((entityId) => {
          expect(entityId).to.eq("customer.com");
        });
    });

    it("can add a new Azure provider", () => {
      cy.contains("Actions").click();
      cy.contains("Add new IDP").click();

      cy.contains("Azure").click();
      cy.contains("Next").click();

      cy.get("input#osso-azure-acs-url")
        .invoke("val")
        .then((acsUrl) => {
          expect(acsUrl).to.match(
            /http:\/\/localhost:9292\/auth\/saml\/.*\/callback/
          );
        });

      cy.get("input#osso-azure-entity-id")
        .invoke("val")
        .then((entityId) => {
          expect(entityId).to.eq("customer.com");
        });
    });

    it("can download the PDF setup docs", () => {
      cy.task("allowDownloads");

      cy.contains("Download").click();
    });

    it("can complete configuration", () => {
      cy.contains("Complete").click();
    });
  });
});
