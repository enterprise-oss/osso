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

if ENV['RACK_ENV'] == 'production'
  Mail.defaults do
    delivery_method :smtp, {
      port: ENV['SMTP_PORT'],
      address: ENV['SMTP_SERVER'],
      user_name: ENV['SMTP_LOGIN'],
      password: ENV['SMTP_PASSWORD'],
      domain: "#{ENV['SMTP_DOMAIN']}",
      authentication: :plain,
    }
  end
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
