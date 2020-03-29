# frozen_string_literal: true

require 'rubygems'
require 'bundler/setup'
require 'rack/contrib'
require 'omniauth'
require 'omniauth-saml'
require 'omniauth-multi-provider'
require 'sinatra/base'
require 'sinatra/activerecord'
require 'sinatra/contrib'
require 'sinatra/json'
require 'sinatra/namespace'

if ENV['RACK_ENV'].nil? || ENV['RACK_ENV'] == 'development'
  require 'dotenv/load'
  require 'pry'
end

require_relative 'models/models'
require_relative 'routes/routes'
# require_relative 'services/services'

# The main authentication logic happens in the top level App class.
class App < Sinatra::Base
  register Sinatra::Namespace

  configure :development, :production do
    db = URI.parse(ENV.fetch('DATABASE_URL'))
    ActiveRecord::Base.establish_connection(
      adapter: 'postgresql',
      host: db.host,
      username: db.user,
      password: db.password,
      database: db.path[1..-1],
    )
  end

  use Rack::PostBodyContentTypeParser
  use Rack::Session::Cookie, secret: ENV.fetch('SESSION_SECRET')

  use OmniAuth::Builder do
    OmniAuth::MultiProvider.register(
      self,
      provider_name: 'saml',
      issuer: ENV['HEROKU_APP_NAME'],
      identity_provider_id_regex: /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/,
      path_prefix: '/auth/saml',
      callback_suffix: 'callback',
      name_identifier_format:
        'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    ) do |idp_instance_id, rack_env|
      idp = Models::IdentityProviderInstance.find(idp_instance_id)

      rack_env['saml_identity_provider'] = idp

      idp.saml_options
    end
  end

  get '/' do
    render :html, :index
  end

  get '/login' do
    render :html, :login
  end

  post '/single_sign_on' do
    domain = params['domain'] || params['email']&.split('@')&.last
    redirect "/auth/saml/#{domain}"
  end

  post '/auth/saml/:idp_id/callback' do
    attributes = env['omniauth.auth']&.
      extra&.
      response_object&.
      attributes

    user = Models::User.where(
      email: attributes['email'],
      idp_id: attributes['id'],
    ).first_or_create

    json user: user
  end

  namespace :oauth do
    register ::Routes::Oauth
    register ::Routes::OauthApplications
  end
end
