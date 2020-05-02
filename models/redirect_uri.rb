# frozen_string_literal: true

module Models
  class RedirectUri < ActiveRecord::Base
    belongs_to :oauth_client

    # before_validation :set_primary, on: :creaet, :update

    private

    def set_primary
      if primary_was.true? && primary.false?

      end
      self.identifier = SecureRandom.base64(16)
      self.secret = SecureRandom.base64(64)
    end
  end
end
