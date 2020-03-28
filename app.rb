# frozen_string_literal: true

require 'rubygems'
require 'bundler/setup'
require 'rack/contrib'
require 'omniauth'
require 'omniauth-saml'
require 'omniauth-multi-provider-saml'
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
    OmniAuth::SAML::MultiProvider.register(
      self,
      provider: :saml,
      issuer: 'Ruby Demo',
      identity_provider_id_regex: /(\w|\.)+/,
      name_identifier_format:
        'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    ) do |domain, _rack_env|
      identity_provider_instance = Models::IdentityProviderInstance.find_by!(
        domain: domain,
      )

      identity_provider_instance.saml_options
    end
  end

  get '/' do
    render :html, :index
  end

  post '/single_sign_on' do
    # get domain
    # find provider
  end

  post '/auth/saml/:domain/callback' do
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
