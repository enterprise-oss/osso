# frozen_string_literal: true

task :bootstrap do
  %w[Production Staging Development].each do |environement|
    Models::OauthClient.create!(
      name: environement,
    )
  end
end
