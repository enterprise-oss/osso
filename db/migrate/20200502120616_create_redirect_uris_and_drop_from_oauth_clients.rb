class CreateRedirectUrisAndDropFromOauthClients < ActiveRecord::Migration[6.0]
  def change
    remove_column :oauth_clients, :redirect_uris

    create_table :redirect_uris, id: :uuid do |t|
      t.string :uri, null: false
      t.boolean :primary, default: false, null: false
    end

    add_index :redirect_uris, [:uri, :primary], unique: true
    add_reference :redirect_uris, :oauth_client, type: :uuid, index: true
  end
end
