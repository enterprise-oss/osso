# frozen_string_literal: true

ruby '2.5.6'

source 'https://rubygems.org'

gem 'doorkeeper', require: false
gem 'omniauth'
gem 'omniauth-multi-provider'
gem 'omniauth-saml'
gem 'pg'
gem 'rack-contrib'
gem 'rack-oauth2'
gem 'rake'
gem 'ruby-saml', '~> 1.9.0'
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
  gem 'rack-vcr'
  gem 'rubocop'
  gem 'vcr'
end
