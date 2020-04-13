# frozen_string_literal: true

require 'rack/oauth2'

module Routes
  module Oauth
    extend Sinatra::Extension

    get '/oauth/authorize' do
      Rack::OAuth2::Server::Authorize.new do |req, _res|
        client = Models::OauthClient.find_by!(identifier: req.client_id)
        req.verify_redirect_uri!(client.redirect_uris)
      end.call(env)

      @enterprise = Models::EnterpriseAccount
        .includes(:saml_providers)
        .find_by!(domain: params[:domain])

      if @enterprise.single_provider?
        redirect "/auth/saml/#{@enterprise.provider.id}"
      end

      erb :multiple_providers

    rescue Rack::OAuth2::Server::Authorize::BadRequest => e
      @error = e
      return erb :error
    end

    post '/oauth/token' do
      code = Models::AuthorizationCode.valid.find_by_token!(params[:code])

      Rack::OAuth2::Server::Token.new do |req, res|
        client = Models::OauthClient.find_by!(identifier: req.client_id)
        req.invalid_client! if client.secret != req.client_secret
        req.invalid_grant! if code.redirect_uri != req.redirect_uri
        res.access_token = code.access_token.to_bearer_token
      end.call(env)

      json user: code.user
    end
  end
end
