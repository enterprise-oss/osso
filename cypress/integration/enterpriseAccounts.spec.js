describe('EnterpriseAccounts', () => {

  describe('with an Admin user', () => {
    before(() => {
      cy.login('admin@saas.com', 'admin')
    })

    it('renders a header title', () => {
      cy.visit('/admin/enterprise')
      cy.get('h1').should('contain', 'Customers')
    })
  })

})