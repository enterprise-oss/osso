class CreateAccessTokens < ActiveRecord::Migration[6.0]
  def change
    create_table :access_tokens, id: :uuid do |t|
      t.string :token
      t.datetime :expires_at

      t.timestamps
    end

    add_reference :access_tokens, :user, type: :uuid, index: true
    add_reference :access_tokens, :oauth_client, type: :uuid, index: true
  end
end