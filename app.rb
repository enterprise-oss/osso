# frozen_string_literal: true

if ENV['RACK_ENV'].nil? || ENV['RACK_ENV'] == 'development'
  require 'dotenv/load'
  require 'pry'
end

require 'rack/contrib'
require 'sinatra/activerecord'
require 'sinatra/base'
require 'sinatra/contrib'
require 'sinatra/json'

require_relative 'helpers/helpers'
require_relative 'lib/oauth2_token'
require_relative 'models/models'
require_relative 'routes/routes'

# The App class is the main entry point for the application
# and is repsonsible for requiring the rest of the source
# and creating a dB connection, etc.
class App < Sinatra::Base
  configure :development, :production do
    ActiveRecord::Base.establish_connection(
      ENV.fetch('DATABASE_URL'),
    )
  end

  use Rack::JSONBodyParser
  use Rack::Session::Cookie, secret: ENV['SESSION_SECRET']

  error ActiveRecord::RecordNotFound do
    status 404
  end

  register ::Routes::Admin
  register ::Routes::Auth
  register ::Routes::Oauth
end
