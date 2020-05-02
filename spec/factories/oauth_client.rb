# frozen_string_literal: true

FactoryBot.define do
  factory :oauth_client, class: Models::OauthClient do
    id { SecureRandom.uuid }
    name { Faker::Internet.domain_name }
    after(:create) do |client|
      create(:primary_redirect_uri, oauth_client: client)
      create(:redirect_uri, oauth_client: client)
    end
  end
end
