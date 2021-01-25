import faker from "faker";

describe("Configuration", () => {
  describe("with an Admin user", () => {
    beforeEach(() => {
      cy.login("admin@saas.co");
    });

    it("renders the configuration menu item", () => {
      cy.visit("/admin");
      cy.contains("Configuration").click();
      cy.url().should("match", /\/admin\/config/);
    });

    it("can view configuration", () => {
      cy.visit("/admin/config");

      cy.contains("OAuth Client");
    });

    it("can create an oauth client", () => {
      cy.visit("/admin/config");

      cy.contains("Add new client").click();

      cy.get("input#client-name").type("NewClient");
      cy.contains("Done").click();

      cy.contains("NewClient");
    });

    it("can view an oauth client", () => {
      cy.visit("/admin/config");

      cy.get("table tr").get("td > a").last().click();

      cy.url().should("match", /\/config\/.*$/);
    });

    // TODO: App Config
  });

  describe("with an Internal user", () => {
    beforeEach(() => {
      cy.login("basic@saas.co");
    });

    it("does not have the configuration menu item", () => {
      cy.visit("/admin");
      cy.contains("Configuration").should("not.exist");
    });

    xit("cannot visit configuration", () => {
      cy.request({ url: "/admin/config", followRedirect: false }).then(
        (resp) => {
          expect(resp.status).to.eq(302);
        }
      );
    });
  });
});
