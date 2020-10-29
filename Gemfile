# frozen_string_literal: true

gem 'dotenv', require: 'dotenv/load', groups: %i[development test]

ruby '2.6.6'

source 'https://rubygems.org'

gem 'activesupport', '>= 6.0.3.2'
gem 'graphql'
gem 'osso', git: 'https://github.com/enterprise-oss/osso-rb', ref: '01b76f1'
gem 'pg'
gem 'rack', '>= 2.1.4'
gem 'rack-cors'
gem 'rake'
gem 'rodauth', :git => 'https://github.com/jeremyevans/rodauth', ref: 'f89179'
gem 'sinatra'


group :test do
  gem 'database_cleaner-active_record'
  gem 'factory_bot'
  gem 'faker'
  gem 'rack-test'
  gem 'rspec', '~> 3.2'
  gem 'simplecov', '= 0.17', require: false
  gem 'webmock', '~> 3.9'
end

group :development, :test do
  gem 'pry'
  gem 'rubocop'
end
