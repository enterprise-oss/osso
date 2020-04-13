# frozen_string_literal: true

module Models
  class AuthorizationCode < ActiveRecord::Base
    include ::OAuth2Token

    def access_token
      @access_token ||= expired! && user.access_tokens.create(oauth_client: oauth_client)
    end
  end
end
