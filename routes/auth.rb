# frozen_string_literal: true

require 'cgi'
require 'omniauth'
require 'omniauth-multi-provider'
require 'omniauth-saml'

module Routes
  module Auth
    extend Sinatra::Extension
    UUID_REGEXP =
      /[0-9a-f]{8}-[0-9a-f]{3,4}-[0-9a-f]{4}-[0-9a-f]{3,4}-[0-9a-f]{12}/
        .freeze

    def self.internal_redirect?(env)
      env['HTTP_REFERER']&.match(env['SERVER_NAME'])
    end

    use OmniAuth::Builder do
      OmniAuth::MultiProvider.register(
        self,
        provider_name: 'saml',
        identity_provider_id_regex: UUID_REGEXP,
        path_prefix: '/auth/saml',
        callback_suffix: 'callback',
      ) do |saml_provider_id, env|
        # raise saml_provider_id
        # If we are redirecting from the Oauth route, we
        # know that this is an SP Initiated login, and
        # can set a redirect. Otherwise we use the client's
        # default redirect URI for IDP Initiated login
        if Routes::Auth.internal_redirect?(env)
          referrer = URI.parse(env['HTTP_REFERER'])
          env['redirect_uri'] = CGI.parse(referrer.query)
        end

        provider = Models::SamlProvider.find(saml_provider_id)
        env['saml_provider'] = provider
        provider.saml_options
      end
    end

    post '/auth/saml/:uuid/callback' do
      provider = env['saml_provider']
      oauth_client = provider.oauth_client
      redirect_uri = env['redirect_uri'] || oauth_client.default_redirect_uri

      attributes = env['omniauth.auth']
        &.extra
        &.response_object
        &.attributes

      user = Models::User.where(
        email: attributes[:email],
        idp_id: attributes[:id],
        saml_provider_id: provider.id,
      ).first_or_create!

      authorization_code = user.authorization_codes.create!(
        oauth_client: oauth_client,
        redirect_uri: redirect_uri,
      )

      redirect(redirect_uri + "?code=#{authorization_code.token}")
    end
  end
end
