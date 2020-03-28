# frozen_string_literal: true

FactoryBot.define do
  factory :slack_channel do
    id { SecureRandom.uuid }
  end
end
