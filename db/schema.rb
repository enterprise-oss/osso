# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_02_01_220556) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "access_tokens", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "token"
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.uuid "oauth_client_id"
    t.jsonb "requested", default: {}
    t.index ["oauth_client_id"], name: "index_access_tokens_on_oauth_client_id"
    t.index ["token", "expires_at"], name: "index_access_tokens_on_token_and_expires_at", unique: true
    t.index ["user_id"], name: "index_access_tokens_on_user_id"
  end

  create_table "account_password_hashes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "password_hash", null: false
  end

  create_table "account_password_reset_keys", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.datetime "deadline", null: false
    t.datetime "email_last_sent", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "account_remember_keys", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.datetime "deadline", null: false
  end

  create_table "account_verification_keys", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.datetime "requested_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "email_last_sent", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.uuid "account_id"
    t.index ["account_id"], name: "index_account_verification_keys_on_account_id"
  end

  create_table "accounts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.citext "email", null: false
    t.integer "status_id", default: 1, null: false
    t.string "role", default: "admin", null: false
    t.string "oauth_client_id"
    t.index ["email"], name: "index_accounts_on_email", unique: true, where: "(status_id = ANY (ARRAY[1, 2]))"
    t.index ["oauth_client_id"], name: "index_accounts_on_oauth_client_id"
  end

  create_table "app_configs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "contact_email"
    t.string "logo_url"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "authorization_codes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "token"
    t.string "redirect_uri"
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.uuid "oauth_client_id"
    t.jsonb "requested", default: {}
    t.index ["oauth_client_id"], name: "index_authorization_codes_on_oauth_client_id"
    t.index ["token"], name: "index_authorization_codes_on_token", unique: true
    t.index ["user_id"], name: "index_authorization_codes_on_user_id"
  end

  create_table "enterprise_accounts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "domain", null: false
    t.uuid "external_uuid"
    t.integer "external_int_id"
    t.string "external_id"
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "users_count", default: 0
    t.index ["domain"], name: "index_enterprise_accounts_on_domain", unique: true
  end

# Could not dump table "identity_providers" because of following StandardError
#   Unknown type 'identity_provider_service' for column 'service'

  create_table "oauth_clients", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "secret", null: false
    t.string "identifier", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["identifier"], name: "index_oauth_clients_on_identifier", unique: true
  end

  create_table "redirect_uris", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "uri", null: false
    t.boolean "primary", default: false, null: false
    t.uuid "oauth_client_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["oauth_client_id"], name: "index_redirect_uris_on_oauth_client_id"
    t.index ["uri", "primary"], name: "index_redirect_uris_on_uri_and_primary", unique: true
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "idp_id", null: false
    t.uuid "identity_provider_id"
    t.uuid "enterprise_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "idp_id"], name: "index_users_on_email_and_idp_id", unique: true
    t.index ["enterprise_account_id"], name: "index_users_on_enterprise_account_id"
  end

  add_foreign_key "account_password_hashes", "accounts", column: "id"
  add_foreign_key "account_password_reset_keys", "accounts", column: "id"
  add_foreign_key "account_remember_keys", "accounts", column: "id"
  add_foreign_key "users", "identity_providers"
end
