class DropNullConstraintsFromSamlProvider < ActiveRecord::Migration[6.0]
  def change
    change_column :saml_providers, :idp_sso_target_url, :string, null: true
    change_column :saml_providers, :idp_cert, :text, null: true
    change_column :saml_providers, :assertion_consumer_service_url, :string, null: false
  end
end
