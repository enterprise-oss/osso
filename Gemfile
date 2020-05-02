# frozen_string_literal: true

ruby '2.6.4'

source 'https://rubygems.org'

gem 'jwt'
gem 'omniauth-multi-provider'
gem 'omniauth-saml'
gem 'pg'
gem 'rack', '~> 2.0.0'
gem 'rack-contrib'
gem 'rack-oauth2'
gem 'rake'
gem 'sinatra'
gem 'sinatra-activerecord'
gem 'sinatra-contrib', require: 'sinatra/extension'

group :test do
  gem 'database_cleaner-active_record'
  gem 'factory_bot'
  gem 'rspec'
  gem 'webmock'
end

group :development, :test do
  gem 'dotenv'
  gem 'faker'
  gem 'pry'
  gem 'rack-test'
  gem 'rubocop'
end
