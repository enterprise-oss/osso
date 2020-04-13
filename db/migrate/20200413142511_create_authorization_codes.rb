class CreateAuthorizationCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :authorization_codes, id: :uuid do |t|
      t.string :token
      t.string :redirect_uri
      t.datetime :expires_at

      t.timestamps
    end

    add_index :authorization_codes, :token, unique: true
    add_reference :authorization_codes, :user, type: :uuid, index: true
    add_reference :authorization_codes, :oauth_client, type: :uuid, index: true
  end
end
