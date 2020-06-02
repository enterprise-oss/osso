# frozen_string_literal: true

ruby '2.6.4'

source 'https://rubygems.org'

gem 'graphql'
gem 'osso', path: '../osso-rb'
gem 'pg'
gem 'rake'
gem 'sinatra'
gem 'sinatra-cors'

group :test do
  gem 'database_cleaner-active_record'
  gem 'rspec'
  gem 'webmock'
end

group :development, :test do
  gem 'sinatra-contrib'
  gem 'dotenv'
  gem 'pry'
  gem 'rubocop'
end
