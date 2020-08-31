import faker from "faker";

describe("Configuration", () => {
  describe("with an Admin user", () => {
    beforeEach(() => {
      cy.login("admin@example.com", "admin");
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

      cy.get("input").type("NewClient");
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
      cy.login("internal@example.com", "internal");
    });

    it("does not have the configuration menu item", () => {
      cy.visit("/admin");
      cy.contains("Configuration").should("not.be.visible");
    });

    it("cannot visit configuration", () => {
      cy.request({ url: "/admin/config", followRedirect: false }).then(
        (resp) => {
          expect(resp.status).to.eq(302);
        }
      );
    });
  });

  describe("with an end-user", () => {
    it("does not have the configuration menu item", () => {
      const domain = faker.internet.domainName();
      cy.login(`end-user@${domain}`, "end-user");

      // cy.visit(`/admin`);
      cy.contains("Configuration").should("not.be.visible");
    });

    it("cannot visit configuration", () => {
      const domain = faker.internet.domainName();
      cy.login(`end-user@${domain}`, "end-user");

      cy.request({ url: "/admin/config", followRedirect: false }).then(
        (resp) => {
          expect(resp.status).to.eq(302);
        }
      );
    });
  });
});
