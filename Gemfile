# frozen_string_literal: true

ruby '2.6.4'

source 'https://rubygems.org'

gem 'graphql'
gem 'osso'
gem 'pg'
gem 'rack', '>= 2.1.4'
gem 'rake'
gem 'sinatra'
gem 'sinatra-cors'

group :test do
  gem 'database_cleaner-active_record'
  gem 'rspec'
  gem 'webmock'
end

group :development, :test do
  gem 'dotenv'
  gem 'pry'
  gem 'rubocop'
  gem 'sinatra-contrib'
end
