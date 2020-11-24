# frozen_string_literal: true

require 'sinatra/reloader'
require 'osso'

class App < Sinatra::Base
  include Osso::AppConfig
  include Osso::RouteMap

  register Sinatra::ActiveRecordExtension

  get '/' do
    redirect '/admin/enterprise'
  end

  get '/health' do
    'ok'
  end
end
