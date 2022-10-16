# frozen_string_literal: true

gem 'dotenv', require: 'dotenv/load', groups: %i[development test]

ruby '3.1.2'

source 'https://rubygems.org'

gem 'activesupport'
gem 'osso'
gem 'pg'
gem 'puma'
gem 'rack'
gem 'rack-cors'
gem 'rake'
gem 'sentry-raven'
gem 'sinatra'

group :test do
  gem 'database_cleaner-active_record'
  gem 'factory_bot'
  gem 'faker'
  gem 'rack-test'
  gem 'rspec'
  gem 'simplecov'
  gem 'webmock'
end

group :development, :test do
  gem 'pry'
  gem 'rubocop'
end
