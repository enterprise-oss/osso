# frozen_string_literal: true

module Models
  # Subclass for Okta IDP instances
  class OktaSamlProvider < Models::SamlProvider
    def saml_options
      attributes.slice(
        'domain',
        'idp_cert',
        'idp_sso_target_url',
      ).merge(
        issuer: id,
        name_identifier_format: NAME_FORMAT,
      ).symbolize_keys
    end
  end
end
