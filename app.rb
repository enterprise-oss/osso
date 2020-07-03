# frozen_string_literal: true

require 'sinatra/reloader'
require 'sinatra/cors'
require 'osso'
require_relative 'graphql/schema'

class App < Sinatra::Base
  include Osso::AppConfig
  include Helpers::Auth # TODO: namespace helpers in gem

  configure :development do
    register Sinatra::Reloader
  end

  configure :development, :production do
    ActiveRecord::Base.establish_connection(
      ENV.fetch('DATABASE_URL'),
    )
  end

  register Sinatra::Cors

  set :allow_origin, '*'
  set :allow_methods, 'GET,HEAD,POST,OPTIONS'
  set :allow_headers, 'content-type,if-modified-since'
  set :expose_headers, 'location,link'

  post '/graphql' do
    enterprise_protected!

    result = OssoSchema.execute(
      params[:query],
      variables: params[:variables],
      context: { scope: current_scope },
    )

    json result
  end
end
