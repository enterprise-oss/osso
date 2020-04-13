# frozen_string_literal: true

module Models
  class AccessToken < ActiveRecord::Base
    include OAuth2Token
    self.default_lifetime = 10.minutes
    belongs_to :refresh_token

    def to_bearer_token
      bearer_token = Rack::OAuth2::AccessToken::Bearer.new(
        access_token: token,
        expires_in: expires_in,
      )

      bearer_token
    end

    private

    def setup
      super
      if refresh_token
        self.user = refresh_token.user
        self.client = refresh_token.client
        self.expires_at = [expires_at, refresh_token.expires_at].min
      end
    end
  end
end
