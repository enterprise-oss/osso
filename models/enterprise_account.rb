# frozen_string_literal: true

module Models
  # Base class for Enterprises. This should map one-to-one with
  # your own Account model. Persisting the EnterpriseAccount id
  # in your application's database is recommended. The table also
  # includes fields for external IDs such that you can persist
  # your ID for an account in SAMLBox.
  class EnterpriseAccount < ActiveRecord::Base
    has_many :users
    has_many :saml_providers

    def single_provider?
      saml_providers.one?
    end

    def provider
      return false unless single_provider?

      saml_providers.first
    end
  end
end
