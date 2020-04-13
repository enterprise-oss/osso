# frozen_string_literal: true

FactoryBot.define do
  factory :oauth_client, class: Models::OauthClient do
    id { SecureRandom.uuid }
    name { Faker::Internet.domain_name }
    redirect_uris do
      [
        Faker::Internet.url(path: '/saml-box/callback'),
        Faker::Internet.url(host: 'localhost:9292'),
      ]
    end
  end
end
