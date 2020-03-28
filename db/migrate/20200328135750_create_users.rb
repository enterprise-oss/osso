# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string  :email,  null: false
      t.string  :idp_id, null: false
    end

    add_index :users, %i[email idp_id], unique: true
  end
end
