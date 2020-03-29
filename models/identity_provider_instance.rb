# frozen_string_literal: true

module Models
  class IdentityProviderInstance < ActiveRecord::Base
    def saml_options
      case provider
      when 'okta'
        attributes.slice(
          'domain',
          'idp_cert',
          'idp_sso_target_url',
        ).merge(
          issuer: id,
          name_identifier_format:
            'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        )
      when 'azure'
        attributes.slice(
          'domain',
          'idp_cert',
          'idp_sso_target_url',
        ).merge(
          issuer: "id:#{id}",
        )
      else
        raise "#{x} not implemented"
      end
    end
  end
end
