import faker from "faker";

describe("EnterpriseAccounts", () => {
  describe("with an Admin user", () => {
    before(() => {
      cy.login("admin@example.com", "admin");
    });

    it("can create an enterprise account", () => {
      const company = faker.company.companyName();
      const domain = faker.internet.domainName();

      cy.visit("/admin/enterprise");
      cy.get("button#addNew").click();

      cy.get("input#domain").type(domain);
      cy.get("input#name").type(company);

      cy.contains("Done").click();

      cy.get("table tr").last().get("td > a").contains(company).click();

      cy.url().should("include", `/enterprise/${domain}`);

      cy.get("button").contains("Actions").click();
      cy.get("li").contains("Add new IDP").click();
    });
  });
});
