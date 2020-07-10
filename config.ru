# frozen_string_literal: true

if ENV['RACK_ENV'].nil? || ENV['RACK_ENV'] == 'development'
  require 'dotenv'
  Dotenv.load('.env.development', '.env')
  require 'pry'
end

require 'rubygems'
require 'bundler'

Bundler.require

require './app'
run App
