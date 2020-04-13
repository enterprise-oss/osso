class CreateSamlProviders < ActiveRecord::Migration[6.0]
  def change
    create_table :saml_providers, id: :uuid do |t|
      t.string  :provider,  null: false
      t.string  :domain, null: false
      t.string :idp_sso_target_url, null: false
      t.text :idp_cert, null: false
      t.string :assertion_consumer_service_url
    end

    add_index :saml_providers, [:domain, :provider], unique: true
  end
end
