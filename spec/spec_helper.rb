# frozen_string_literal: true

require 'database_cleaner'
require 'factory_bot'
require 'faker'
require 'rack/test'
require 'rspec'
require 'sidekiq/testing'
require 'pry'
require 'omniauth-slack'
require 'webmock/rspec'

ENV['RACK_ENV'] = 'test'
ENV['SESSION_SECRET'] = 'supersecret'

require File.expand_path '../app.rb', __dir__

OmniAuth.config.test_mode = true
Sidekiq::Testing.fake!
WebMock.disable_net_connect!(allow_localhost: true)

module RSpecMixin
  include Rack::Test::Methods

  def app
    App
  end
end

RSpec.configure do |config|
  config.include RSpecMixin

  # Clean DB between tests
  config.before(:example) do
    DatabaseCleaner.clean_with(:truncation)
  end

  # Factory bot factories
  config.include FactoryBot::Syntax::Methods
  config.before(:suite) do
    FactoryBot.find_definitions
  end
end

def json_fixture(filename)
  JSON.parse(File.read(File.expand_path('support/' + filename, __dir__)))
end
