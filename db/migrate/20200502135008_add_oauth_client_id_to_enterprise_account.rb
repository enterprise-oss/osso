class AddOauthClientIdToEnterpriseAccount < ActiveRecord::Migration[6.0]
  def change
    add_reference :enterprise_accounts, :oauth_client, type: :uuid, index: true
  end
end
