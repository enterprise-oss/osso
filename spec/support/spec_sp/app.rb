# frozen_string_literal: true

require 'rack/protection'
require 'sinatra'
require 'sinatra/json'
require 'omniauth-osso'

class App < Sinatra::Base
  use Rack::Session::Cookie, secret: ENV['SESSION_SECRET'], key: 'osso-saas-app'
  use Rack::Protection

  get '/' do
    erb :index
  end

  use OmniAuth::Builder do
    provider(
      :osso,
      client_id: ENV['OSSO_CLIENT_ID'],
      client_secret: ENV['OSSO_CLIENT_SECRET'],
      client_options: {
        site: 'http://localhost:9292',
      },
    )
  end

  get '/auth/osso/callback' do
    @profile = JSON.pretty_generate(
      env['omniauth.auth'],
    )

    erb :profile
  rescue OAuth2::Error => e
    @error = e
    erb :error
  end
end
