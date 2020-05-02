# frozen_string_literal: true

ruby '2.6.4'

source 'https://rubygems.org'

gem 'osso', '0.0.1.1'
gem 'pg'
gem 'rake'
gem 'sinatra'

group :test do
  gem 'database_cleaner-active_record'
  gem 'rspec'
  gem 'webmock'
end

group :development, :test do
  gem 'dotenv'
  gem 'pry'
  gem 'rubocop'
end
