describe("Oauth Client", () => {
  describe("with an Admin user", () => {
    beforeEach(() => {
      cy.login("admin@saas.co");
      cy.visit("/admin/config");
      cy.get("table tr").get("td > a").last().click();
    });

    it("can regenerate credentials", () => {
      cy.get("input#osso-client-id")
        .invoke("val")
        .then((val1) => {
          cy.contains("Regenerate").click({ force: true });

          cy.get("input#osso-client-id")
            .invoke("val")
            .should((val2) => {
              expect(val1).not.to.eq(val2);
            });
        });
    });

    it("can add a redirect URI", () => {
      const callback = "https://foo.com/callback";
      cy.contains("Add new redirect").click();
      cy.get("button.ant-btn-icon-only").click();

      cy.get("div#uri-0").find("input").type(callback);

      cy.contains("Done").click();

      cy.contains(callback);
    });

    it("can duplicate the oauth client", () => {
      const url = cy.url();
      cy.contains("Actions").click();
      cy.contains("Duplicate").click();
      expect(cy.url()).to.not.equal(url);
    });

    it("can delete the client", () => {
      cy.contains("Actions").click();
      cy.contains("Delete").click();
      cy.url().should("match", /\/admin\/config$/);
    });
  });
});
