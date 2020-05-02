# frozen_string_literal: true

if ENV['RACK_ENV'].nil? || ENV['RACK_ENV'] == 'development'
  require 'dotenv/load'
  require 'pry'
end

# require 'rack/contrib'
# require 'sinatra/base'
# require 'sinatra/contrib'
# require 'sinatra/json'

require 'osso'

class App < Sinatra::Base
  include Osso::AppConfig
  configure :development, :production do
    ActiveRecord::Base.establish_connection(
      ENV.fetch('DATABASE_URL'),
    )
  end
end
