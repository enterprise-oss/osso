# frozen_string_literal: true

gem 'dotenv', require: 'dotenv/load', groups: %i[development test]

ruby '2.6.6'

source 'https://rubygems.org'

gem 'activesupport', '>= 6.0.3.2'
gem 'graphql'
gem 'osso', path: '../osso-rb' #git: 'https://github.com/enterprise-oss/osso-rb.git', branch: 'main'
gem 'pg'
gem 'rack', '>= 2.1.4'
gem 'rack-cors'
gem 'rake'
gem 'sinatra'
gem 'sentry-raven'

gem 'sinatra-activerecord', '2.0.20'

group :test do
  gem 'database_cleaner-active_record'
  gem 'factory_bot'
  gem 'faker'
  gem 'rack-test'
  gem 'rspec', '~> 3.10'
  gem 'simplecov', '= 0.17', require: false
  gem 'webmock', '~> 3.11'
end

group :development, :test do
  gem 'pry'
  gem 'rubocop'
end
