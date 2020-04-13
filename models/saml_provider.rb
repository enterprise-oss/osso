# frozen_string_literal: true

module Models
  # Base class for SAML Providers
  class SamlProvider < ActiveRecord::Base
    NAME_FORMAT = 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
    self.inheritance_column = :provider
    belongs_to :enterprise_account
    belongs_to :oauth_client

    def saml_options
      raise(
        NoMethodError,
        '#saml_options must be defined on each provider specific subclass',
      )
    end
  end
end

require_relative 'saml_providers/azure_saml_provider'
require_relative 'saml_providers/okta_saml_provider'
