# frozen_string_literal: true

require 'sinatra/reloader'
# require 'sinatra/cors'
require 'osso'

class App < Sinatra::Base
  include Osso::AppConfig
  include Osso::Helpers::Auth

  # configure :development do
  #   register Sinatra::Reloader
  # end

  register Sinatra::ActiveRecordExtension

  include Osso::RouteMap

  get '/' do
    redirect '/admin/enterprise' # if ENV['RACK_ENV'] == 'development'
  end

  get '/health' do
    'ok'
  end

  # options '/pdfv1/:filename' do
  #   response.headers["Access-Control-Allow-Origin"] = "http://localhost:3000"
  #   response.headers["Access-Control-Allow-Methods"] = 'GET,HEAD,POST,OPTIONS'
  #   response.headers["Access-Control-Allow-Headers"] = "Content-Type,Accept,Origin,Authorization,content-type,if-modified-since"
  #   response.headers["Access-Control-Allow-Credentials"] = "true"
    
  #   puts "================================"
  #   puts 'OUR OWN OPTIONS BLOCK'
  #   puts "================================"

  #   200
  # end
end
