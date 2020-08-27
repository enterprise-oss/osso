import faker from "faker";

describe("EnterpriseAccounts", () => {
  describe("with an Admin user", () => {
    beforeEach(() => {
      cy.login("admin@example.com", "admin");
    });

    it("can create any enterprise account", () => {
      const company = faker.company.companyName();
      const domain = faker.internet.domainName();

      cy.visit("/admin/enterprise");
      cy.get("button#addNew").click();

      cy.get("input#domain").type(domain);
      cy.get("input#name").type(company);
      cy.get("input#oauthClientId").click();
      cy.get("div").contains("Production").click();

      cy.contains("Done").click();

      cy.contains(company);
    });

    it("can view any enterprise account", () => {
      cy.visit("/admin/enterprise");

      cy.get("table tr").get("td > a").last().click();
      cy.url().should("match", /\/enterprise\/.*$/);
    });
  });
  describe("with an Internal user", () => {
    beforeEach(() => {
      cy.login("internal@example.com", "internal");
    });

    it("can create any enterprise account", () => {
      const company = faker.company.companyName();
      const domain = faker.internet.domainName();

      cy.visit("/admin/enterprise");
      cy.get("button#addNew").click();

      cy.get("input#domain").type(domain);
      cy.get("input#name").type(company);

      cy.contains("Done").click();

      cy.contains(company);
    });

    it("can view any enterprise account", () => {
      cy.visit("/admin/enterprise");

      cy.get("table tr").get("td > a").last().click();
      cy.url().should("match", /\/enterprise\/.*$/);
    });
  });

  describe("with an end-user", () => {
    it("can create an enterprise account for own domain", () => {
      const company = "NewCo";
      const domain = faker.internet.domainName();

      cy.login(`end-user@${domain}`, "end-user");

      cy.visit("/admin/enterprise");
      cy.get("button#addNew").click();

      cy.get("input#domain").type(domain);
      cy.get("input#name").type(company);

      cy.contains("Done").click();

      cy.contains(company);
    });

    it("can view its own enterprise account", () => {
      cy.login("end-user@customer.com", "end-user");

      cy.visit("/admin/enterprise");

      cy.contains("SaaS Co Customer").click();
      cy.url().should("match", /\/enterprise\/customer\.com/);
      cy.contains("SaaS Co Customer");
    });
  });
});
