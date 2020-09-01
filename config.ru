# frozen_string_literal: true

if ENV['RACK_ENV'] != 'production'
  require 'dotenv'
  Dotenv.load('.env', '.env.development', '.env.test')
  require 'pry'
end

require 'rubygems'
require 'bundler'

Bundler.require

require './app'
run App
