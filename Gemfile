# frozen_string_literal: true

ruby '2.6.4'

source 'https://rubygems.org'

gem 'osso', path: '../osso-rb'
gem 'pg'
gem 'rake'
gem 'sinatra'
# gem 'sinatra-activerecord'
# gem 'sinatra-contrib', require: 'sinatra/extension'

group :test do
  gem 'database_cleaner-active_record'
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
