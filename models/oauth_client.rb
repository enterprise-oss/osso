# frozen_string_literal: true

require 'securerandom'

module Models
  class OauthClient < ActiveRecord::Base
    has_many :access_tokens
    has_many :refresh_tokens
    has_many :saml_providers
    has_many :redirect_uris

    before_validation :setup, on: :create
    validates :name, :secret, presence: true
    validates :identifier, presence: true, uniqueness: true

    def default_redirect_uri
      redirect_uris.find(&:primary)
    end

    def redirect_uri_values
      redirect_uris.map(&:uri)
    end

    private

    def setup
      self.identifier = SecureRandom.hex(16)
      self.secret = SecureRandom.hex(64)
    end
  end
end
