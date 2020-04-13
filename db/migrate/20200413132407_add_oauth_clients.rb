class AddOauthClients < ActiveRecord::Migration[6.0]
  def change
    create_table :oauth_clients, id: :uuid do |t|
      t.string :name, null: false
      t.string :secret, null: false
      t.string :identifier, null: false
      t.jsonb :redirect_uris, default: [], null: false
    end

    add_index :oauth_clients, :redirect_uris, using: :gin
    add_index :oauth_clients, :identifier, unique: true
  end
end
