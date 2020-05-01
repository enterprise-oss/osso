# frozen_string_literal: true

require 'rack/oauth2'

module Routes
  module Oauth
    extend Sinatra::Extension

    # Send your users here in order to being an authentication
    # flow. This flow follows the authorization grant oauth
    # spec with one exception - you must also pass the domain
    # of the user who wants to sign in.
    post '/oauth/authorize' do
      Rack::OAuth2::Server::Authorize.new do |req, _res|
        client = Models::OauthClient.find_by!(identifier: req.client_id)
        req.verify_redirect_uri!(client.redirect_uris)
      end.call(env)

      @enterprise = Models::EnterpriseAccount
        .includes(:saml_providers)
        .find_by!(domain: params[:domain])

      if @enterprise.single_provider?
        session[:oauth_state] = params[:state]
        redirect "/auth/saml/#{@enterprise.provider.id}"
      end

      erb :multiple_providers

    rescue e
      @error = e
      return erb :error
    end

    # Exchange an authorization code token for an access token.
    # In addition to the token, you must include all paramaters
    # required by Oauth spec: redirect_uri, client ID, and client secret
    post '/oauth/token' do
      code = Models::AuthorizationCode
        .find_by_token!(params[:code])

      Rack::OAuth2::Server::Token.new do |req, res|
        client = Models::OauthClient.find_by!(identifier: req.client_id)
        req.invalid_client! if client.secret != req.client_secret
        req.invalid_grant! if client.secret != req.client_secret
        res.access_token = code.access_token.to_bearer_token
      end.call(env)
    end

    # Use the access token to request a user profile
    get '/oauth/me' do
      json Models::AccessToken
        .includes(:user)
        .valid
        .find_by_token!(params[:access_token])
        .user
    end
  end
end
