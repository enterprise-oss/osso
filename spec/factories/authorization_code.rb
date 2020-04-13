# frozen_string_literal: true

FactoryBot.define do
  factory :authorization_code, class: Models::AuthorizationCode do
    id { SecureRandom.uuid }
    redirect_uri { Faker::Internet.url(path: '/saml-box/callback') }
    oauth_client
  end
end
