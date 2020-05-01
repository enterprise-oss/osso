class DropAcsUrl < ActiveRecord::Migration[6.0]
  def change
    remove_column :saml_providers, :assertion_consumer_service_url
  end
end
