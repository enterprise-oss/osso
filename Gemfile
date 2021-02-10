# frozen_string_literal: true

gem 'dotenv', require: 'dotenv/load', groups: %i[development test]

ruby '2.6.6'

source 'https://rubygems.org'

gem 'activesupport', '~> 6.1.2'
gem 'osso', '~> 0.1.2'
gem 'pg'
gem 'puma'
gem 'rack', '>= 2.1.4'
gem 'rack-cors'
gem 'rake'
gem 'sentry-raven'
gem 'sinatra'

group :test do
  gem 'database_cleaner-active_record'
  gem 'factory_bot'
  gem 'faker'
  gem 'rack-test'
  gem 'rspec', '~> 3.10'
  gem 'simplecov', '0.21.2', require: false
  gem 'webmock', '~> 3.11'
end

group :development, :test do
  gem 'pry'
  gem 'rubocop'
end
