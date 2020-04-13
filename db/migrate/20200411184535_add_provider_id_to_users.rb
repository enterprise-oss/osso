class AddProviderIdToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :saml_provider_id, :uuid

    add_foreign_key :users, :saml_providers
  end
end
