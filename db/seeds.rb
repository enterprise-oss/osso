oauth_client = Osso::Models::OauthClient.create!(
  name: 'Production',
  identifier: 'production'
)

Osso::Models::EnterpriseAccount.create!(
  name: 'SaaS Co Customer',
  domain: 'customer.com',
  oauth_client: oauth_client,
)