describe('EnterpriseAccounts', () => {

  describe('with an Admin user', () => {
    before(() => {
      cy.login('admin@saas.com', 'admin')
    })

    it('successfully loads', () => {
      cy.visit('/admin/enterprise')
    })
  })

})