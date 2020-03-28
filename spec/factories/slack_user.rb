# frozen_string_literal: true

FactoryBot.define do
  factory :slack_user do
    id { SecureRandom.uuid }
    slack_token { 'xoxo-token' }
  end
end
