import faker from "faker";

describe("EnterpriseAccounts", () => {
  describe("with an Admin user", () => {
    before(() => {
      cy.exec("RACK_ENV=test bundle exec rake db:migrate");
      cy.exec("RACK_ENV=test bundle exec rake osso:bootstrap");
      cy.login("admin@example.com", "admin");
    });

    it("can create an enterprise account", () => {
      const company = faker.company.companyName();
      const domain = faker.internet.domainName();

      cy.visit("/admin/enterprise");
      cy.get("button#addNew").click();

      cy.get("input#domain").type(domain);
      cy.get("input#name").type(company);
      cy.get("input#oauthClientId").click();
      cy.get("div").contains("Production").click();
      cy.contains("Done").click();

      cy.get("table tbody tr").get("td > a").contains(company).click();

      cy.url().should("include", `/enterprise/${domain}`);

      cy.get("button").contains("Actions").click();
      cy.contains("Add new IDP").click();
    });
  });
});
