# frozen_string_literal: true

FactoryBot.define do
  factory :slack_team do
    id { SecureRandom.uuid }
  end
end
