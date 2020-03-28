# frozen_string_literal: true

ruby '2.5.6'

source 'https://rubygems.org'

gem 'doorkeeper', require: false
gem 'omniauth'
gem 'omniauth-multi-provider-saml'
gem 'omniauth-saml'
gem 'pg'
gem 'rack-contrib'
gem 'rake'
gem 'ruby-saml', '~> 1.9.0'
gem 'sinatra'
gem 'sinatra-activerecord'
gem 'sinatra-contrib', require: 'sinatra/extension'

group :test do
  gem 'database_cleaner'
  gem 'factory_bot'
  gem 'rack-test'
  gem 'rspec'
  gem 'webmock'
end

group :development, :test do
  gem 'dotenv'
  gem 'faker'
  gem 'pry'
end
