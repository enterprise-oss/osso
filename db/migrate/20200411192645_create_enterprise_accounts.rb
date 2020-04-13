class CreateEnterpriseAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :enterprise_accounts, id: :uuid do |t|
      t.string  :domain, null: false
      t.uuid :external_uuid
      t.integer :external_int_id
      t.string :external_id
    end

    add_index :enterprise_accounts, :domain, unique: true

    add_reference :saml_providers, :enterprise_account, type: :uuid, index: true    
    add_reference :users, :enterprise_account, type: :uuid, index: true
  end
end
