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
    port: ENV['MAILGUN_SMTP_PORT'],
    address: ENV['MAILGUN_SMTP_SERVER'],
    user_name: ENV['MAILGUN_SMTP_LOGIN'],
    password: ENV['MAILGUN_SMTP_PASSWORD'],
    domain: "#{ENV['HEROKU_APP_NAME']}.herokuapp.com",
    authentication: :plain,
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
