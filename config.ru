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

Mail.defaults do
  delivery_method :smtp, {
    user_name: ENV['SENDGRID_USERNAME'],
    password: ENV['SENDGRID_PASSWORD'],
    domain: 'ossoapp.io',
    address: 'smtp.sendgrid.net',
    port: 587,
    authentication: :plain,
    enable_starttls_auto: true,
  }
end

app = Rack::Builder.new do
  use Rack::Cors do
    allow do
      origins '*'
      resource '/pdfv1/*', headers: :any, methods: %i[get options]
    end

    allow do
      origins '*'
      resource '/graphql', headers: :any, methods: %i[post options]
    end
  end

  run App
end

run app
