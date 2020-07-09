# frozen_string_literal: true

if ENV['RACK_ENV'].nil? || ENV['RACK_ENV'] == 'development'
  require 'dotenv'
  Dotenv.load('.env.development', '.env')
  require 'pry'
end

require 'rubygems'
require 'bundler'
require 'osso'

Bundler.require

require './app'

run Rack::URLMap.new(
  '/' => App,
  '/admin' => Osso::Admin,
  '/auth' => Osso::Auth,
  '/oauth' => Osso::Oauth,
)
