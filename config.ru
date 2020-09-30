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

app = Rack::Builder.new do
  use Rack::Cors do
    allow do
      origins '*'
      resource '/pdfv1/*', headers: :any, methods: [:get, :options]
    end

    allow do
      origins '*'
      resource '/graphql', headers: :any, methods: [:post, :options]
    end
  end

  run App
end

run app