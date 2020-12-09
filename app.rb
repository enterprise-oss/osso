# frozen_string_literal: true

require 'sinatra/reloader'
require 'osso'
require 'sinatra/asset_pipeline'

class App < Sinatra::Base
  include Osso::AppConfig
  include Osso::RouteMap

  register Sinatra::ActiveRecordExtension
  register Sinatra::AssetPipeline

  get '/' do
    redirect '/admin/enterprise'
  end

  get '/health' do
    'ok'
  end
end
