# frozen_string_literal: true

require 'securerandom'

module Models
  class OauthClient < ActiveRecord::Base
    has_many :access_tokens
    has_many :refresh_tokens
    has_many :saml_providers

    before_validation :setup, on: :create
    validates :name, :redirect_uris, :secret, presence: true
    validates :identifier, presence: true, uniqueness: true

    # TODO: implement this better
    def default_redirect_uri
      redirect_uris.first
    end

    private

    def setup
      self.identifier = SecureRandom.base64(16)
      self.secret = SecureRandom.base64(64)
    end
  end
end
