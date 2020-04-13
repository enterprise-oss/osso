class AddOauthClientReferenceToSamlProviders < ActiveRecord::Migration[6.0]
  def change
    add_reference :saml_providers, :oauth_client, type: :uuid, index: true
  end
end
