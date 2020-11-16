oauth_client = Osso::Models::OauthClient.create!(
  name: 'Production',
  identifier: 'production'
)

Osso::Models::EnterpriseAccount.create!(
  name: 'SaaS Co Customer',
  domain: 'customer.com',
)

admin = Osso::Models::Account.create!(
  email: 'admin@saas.co',
  status_id: 2,
  role: 'admin',
)

ActiveRecord::Base.connection.execute(
  <<~SQL
    INSERT INTO account_password_hashes(id, password_hash) 
    VALUES (#{"'" + admin.id + "'"}, #{"'" + BCrypt::Password.create("password", cost: BCrypt::Engine::MIN_COST).to_s + "'"});
  SQL
)

base = Osso::Models::Account.create!(
  email: 'basic@saas.co',
  status_id: 2,
  role: 'internal',
  oauth_client_id: oauth_client.identifier,
)

ActiveRecord::Base.connection.execute(
  <<~SQL
    INSERT INTO account_password_hashes(id, password_hash) 
    VALUES (#{"'" + base.id + "'"}, #{"'" + BCrypt::Password.create("password", cost: BCrypt::Engine::MIN_COST).to_s + "'"});
  SQL
)

