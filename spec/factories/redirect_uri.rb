# frozen_string_literal: true

FactoryBot.define do
  factory :redirect_uri, class: Models::RedirectUri do
    id { SecureRandom.uuid }
    uri { Faker::Internet.url }
    primary { false }
    oauth_client
  end

  factory :primary_redirect_uri, parent: :redirect_uri do
    primary { true }
  end
end
