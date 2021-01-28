# frozen_string_literal: true

require 'simplecov'
SimpleCov.start

require 'database_cleaner/active_record'
require 'factory_bot'
require 'faker'
require 'pry'
require 'rack/test'
require 'rspec'
require 'webmock/rspec'

ENV['BASE_URL'] = 'https://example.ossoapp.com'
ENV['RACK_ENV'] = 'test'
ENV['SESSION_SECRET'] = 'supersecret'

require File.expand_path '../app.rb', __dir__

module RSpecMixin
  include Rack::Test::Methods

  def app
    Rack::Builder.parse_file('config.ru').first
  end

  def last_json_response
    JSON.parse(last_response.body, symbolize_names: true)
  end
end

RSpec.configure do |config|
  config.include RSpecMixin
  config.include FactoryBot::Syntax::Methods

  config.before(:suite) do
    ActiveRecord::Base.establish_connection
    FactoryBot.find_definitions
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.around(:each) do |example|
    DatabaseCleaner.cleaning do
      example.run
    end
  end

  WebMock.disable_net_connect!(allow_localhost: true)
end
