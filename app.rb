# frozen_string_literal: true

require 'sinatra/reloader'
require 'sinatra/cors'
require 'osso'

class App < Sinatra::Base
  include Osso::AppConfig
  include Osso::Helpers::Auth
  include Osso::RouteMap

  configure :development do
    register Sinatra::Reloader
  end

  register Sinatra::ActiveRecordExtension
  register Sinatra::Cors

  set :allow_origin, '*'
  set :allow_methods, 'GET,HEAD,POST,OPTIONS'
  set :allow_headers, 'content-type,if-modified-since'
  set :expose_headers, 'location,link'

  get '/' do
    redirect '/admin/enterprise' # if ENV['RACK_ENV'] == 'development'
  end

  get '/health' do
    'ok'
  end
end
