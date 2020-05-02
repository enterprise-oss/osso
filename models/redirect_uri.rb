# frozen_string_literal: true

module Models
  class RedirectUri < ActiveRecord::Base
    belongs_to :oauth_client

    # before_validation :set_primary, on: :creaet, :update

    private

    def set_primary
      if primary_was.true? && primary.false?

      end
    end
  end
end
