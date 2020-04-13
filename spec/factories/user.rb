# frozen_string_literal: true

FactoryBot.define do
  factory :user, class: Models::User do
    id { SecureRandom.uuid }
    email { Faker::Internet.email }
    idp_id { SecureRandom.hex(32) }
    saml_provider { create(:okta_saml_provider) }
    enterprise_account
    authorization_codes do
      [
        create(:authorization_code),
      ]
    end
  end
end
