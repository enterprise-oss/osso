# frozen_string_literal: true

module Models
  class User < ActiveRecord::Base
    belongs_to :enterprise_account
    belongs_to :saml_provider
    has_many :authorization_codes, dependent: :delete_all
    has_many :access_tokens, dependent: :delete_all

    def as_json(*)
      {
        email: email,
        id: id,
        idp: saml_provider.name,
      }
    end
  end
end
