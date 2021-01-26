demo_idp_cert = <<-CERT
-----BEGIN CERTIFICATE-----
MIIDtjCCAp4CCQCkrp2ger3dDzANBgkqhkiG9w0BAQsFADCBnDELMAkGA1UEBhMC
VVMxETAPBgNVBAgMCE5ldyBZb3JrMREwDwYDVQQHDAhCcm9va2x5bjEWMBQGA1UE
CgwNRW50ZXJwcmlzZU9TUzENMAsGA1UECwwEZGVtbzEaMBgGA1UEAwwRZW50ZXJw
cmlzZW9zcy5kZXYxJDAiBgkqhkiG9w0BCQEWFXNhbUBlbnRlcnByaXNlb3NzLmRl
djAeFw0yMDEyMDkyMTU5MjVaFw0yMTEyMDkyMTU5MjVaMIGcMQswCQYDVQQGEwJV
UzERMA8GA1UECAwITmV3IFlvcmsxETAPBgNVBAcMCEJyb29rbHluMRYwFAYDVQQK
DA1FbnRlcnByaXNlT1NTMQ0wCwYDVQQLDARkZW1vMRowGAYDVQQDDBFlbnRlcnBy
aXNlb3NzLmRldjEkMCIGCSqGSIb3DQEJARYVc2FtQGVudGVycHJpc2Vvc3MuZGV2
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArAIu2YeGZaEK2AopN9er
mX3iHzkUuwPvnS79VSXVZhjZOwSS4aJl+RGktZjtUyvorRm+kGlvZ1YJFux53scm
XhUYc8bt/eyoB248TVnnUuZlb1Ms/OTahkNZGO1bQ2QxK2uIUYANbWt/3MKe1maw
3bh+aUWewWfuc0yk6uy/P0SBn3pwA58CUcBdMqI3mKNWPIb766XnvHAnoium+QfA
BbWl+MRN13pryrzfjkZJjev6U6IwWYhmbQ88HW45M+BHZAO2WuZYo5bKOUtKPJqS
QisB/Sw+v0VG4uNgb+6zwrUgpPY5d6En15mWbUBPtaoAqaxWd7wpEZXAJ3EIKxw6
bQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCoSC+hc5UKWc7MO5UXU+6D+e7c0RVO
ls/DQzNtzZnjpkN8wWq3fpNLRx/mGamDAnkmjZK2kGqWkfizRqaAksWcpaRHz6mS
UvwKVA15pOBUu+qIn+0rR7wRKTglfNWtrEKPONea1uNrB271XiYdLrxGSCAQXndW
W7vo6N3DJJXRFCxUkL1W4CFEkUTG7KZuZsjpN3z9i9p/i+n9pEvfDj5x/1zoD0PI
pnyrU+VLvVMUlHeklsVMC8C9XgYRWtJqJVuIrK1BraBNhZrvg8HkKLIxqU4ayc2r
hlYTLC++fXIqgXlZXFwjjoWmze9+xWs+JXCN8K9hZ+YA13E8kLKcTHAD
-----END CERTIFICATE-----
CERT

callback_uris = [
  'https://sp.ossoapp.io/auth/osso/callback',
  'http://localhost:4567/auth/osso/callback', # sinatra omniauth
  'http://127.0.0.1:3000/users/auth/osso/callback', # devise (rails) omniauth
  'http://localhost:3000/auth/osso/callback', # devise (rails) omniauth
  'http://localhost:8000/auth/osso/callback', # node passport-osso
  'https://nextjs-demo.ossoapp.com/api/auth/callback/osso',
  'http://localhost:9292/health', # CI
]

oauth_client = Osso::Models::OauthClient.create!(
  name: 'Demo Production',
  identifier: 'demo-client-id',
  secret: 'demo-client-secret'
)

callback_uris.each_with_index do |uri, index|
  Osso::Models::RedirectUri.create(
    oauth_client: oauth_client,
    uri: uri,
    primary: index == 0,
  )
end

customer = Osso::Models::EnterpriseAccount.create!(
  name: 'SaaS Co Customer',
  domain: 'example.com',
)

test_idp = Osso::Models::IdentityProvider.create!(
  sso_cert: demo_idp_cert,
  sso_url: 'https://idp.ossoapp.com/saml-login',
  domain: 'example.com',
  enterprise_account: customer,
  oauth_client: oauth_client,
  status: 'ACTIVE',
  service: 'AZURE' # TODO: add either generic SAML or Osso Test as providers
)

demo_idp_cert = ENV['ENTERPRISE_OSS_OKTA_CERT']

if demo_idp_cert
  demo_customer = Osso::Models::EnterpriseAccount.create!(
    name: 'EnterpriseOSS',
    domain: 'enterpriseoss.dev',
  )

  demo_idp = Osso::Models::IdentityProvider.create!(
    id: "5d606919-1717-41ba-bfa3-8abda6cfea8e",
    sso_cert: demo_idp_cert,
    sso_url: 'https://dev-634049.okta.com/app/dev-634049_ossodemo_1/exk1m96glaUlmZ2A04x7/sso/saml',
    domain: 'enterpriseoss.dev',
    enterprise_account: demo_customer,
    oauth_client: oauth_client,
    status: 'ACTIVE',
    service: 'OKTA'
  )

  # TODO: our before_create hook means we can't provide this as a create option
  demo_idp.update(sso_issuer: 'enterpriseoss.dev')
end

Osso::Models::AppConfig.create!(
  name: 'SaaS App',
  contact_email: 'help@saasapp.com',
  logo_url: 'https://avatars1.githubusercontent.com/u/62798259?s=400&u=7df069faddffb0ef6b52d015a7dba4e61a01dab7&v=4'
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