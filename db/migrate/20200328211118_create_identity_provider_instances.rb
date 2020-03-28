class CreateIdentityProviderInstances < ActiveRecord::Migration[6.0]
  def change
    create_table :identity_provider_instances, id: :uuid do |t|
      t.string  :provider,  null: false
      t.string  :domain, null: false
      t.string :idp_sso_target_url, null: false
      t.text :idp_cert, null: false
    end

    add_index :identity_provider_instances, [:domain, :provider], unique: true
  end
end
