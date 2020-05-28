# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_02_135008) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "access_tokens", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "token"
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.uuid "oauth_client_id"
    t.index ["oauth_client_id"], name: "index_access_tokens_on_oauth_client_id"
    t.index ["user_id"], name: "index_access_tokens_on_user_id"
  end

  create_table "authorization_codes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "token"
    t.string "redirect_uri"
    t.datetime "expires_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "user_id"
    t.uuid "oauth_client_id"
    t.index ["oauth_client_id"], name: "index_authorization_codes_on_oauth_client_id"
    t.index ["token"], name: "index_authorization_codes_on_token", unique: true
    t.index ["user_id"], name: "index_authorization_codes_on_user_id"
  end

  create_table "enterprise_accounts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "domain", null: false
    t.uuid "external_uuid"
    t.integer "external_int_id"
    t.string "external_id"
    t.uuid "oauth_client_id"
    t.index ["domain"], name: "index_enterprise_accounts_on_domain", unique: true
    t.index ["oauth_client_id"], name: "index_enterprise_accounts_on_oauth_client_id"
  end

  create_table "oauth_access_grants", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "resource_owner_id", null: false
    t.uuid "application_id", null: false
    t.string "token", null: false
    t.integer "expires_in", null: false
    t.text "redirect_uri", null: false
    t.datetime "created_at", null: false
    t.datetime "revoked_at"
    t.string "scopes", default: "", null: false
    t.index ["application_id"], name: "index_oauth_access_grants_on_application_id"
    t.index ["token"], name: "index_oauth_access_grants_on_token", unique: true
  end

  create_table "oauth_access_tokens", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "resource_owner_id"
    t.uuid "application_id"
    t.string "token", null: false
    t.string "refresh_token"
    t.integer "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at", null: false
    t.string "scopes"
    t.string "previous_refresh_token", default: "", null: false
    t.index ["application_id"], name: "index_oauth_access_tokens_on_application_id"
    t.index ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true
    t.index ["token"], name: "index_oauth_access_tokens_on_token", unique: true
  end

  create_table "oauth_applications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "secret", null: false
    t.text "redirect_uri", null: false
    t.string "scopes", default: "", null: false
    t.boolean "confidential", default: true, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "oauth_clients", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "secret", null: false
    t.string "identifier", null: false
    t.index ["identifier"], name: "index_oauth_clients_on_identifier", unique: true
  end

  create_table "redirect_uris", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "uri", null: false
    t.boolean "primary", default: false, null: false
    t.uuid "oauth_client_id"
    t.index ["oauth_client_id"], name: "index_redirect_uris_on_oauth_client_id"
    t.index ["uri", "primary"], name: "index_redirect_uris_on_uri_and_primary", unique: true
  end

  create_table "saml_providers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "provider", null: false
    t.string "domain", null: false
    t.string "idp_sso_target_url"
    t.text "idp_cert"
    t.uuid "enterprise_account_id"
    t.uuid "oauth_client_id"
    t.index ["domain", "provider"], name: "index_saml_providers_on_domain_and_provider", unique: true
    t.index ["enterprise_account_id"], name: "index_saml_providers_on_enterprise_account_id"
    t.index ["oauth_client_id"], name: "index_saml_providers_on_oauth_client_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "idp_id", null: false
    t.uuid "saml_provider_id"
    t.uuid "enterprise_account_id"
    t.index ["email", "idp_id"], name: "index_users_on_email_and_idp_id", unique: true
    t.index ["enterprise_account_id"], name: "index_users_on_enterprise_account_id"
  end

  add_foreign_key "oauth_access_grants", "oauth_applications", column: "application_id"
  add_foreign_key "oauth_access_grants", "users", column: "resource_owner_id"
  add_foreign_key "oauth_access_tokens", "oauth_applications", column: "application_id"
  add_foreign_key "oauth_access_tokens", "users", column: "resource_owner_id"
  add_foreign_key "users", "saml_providers"
end
