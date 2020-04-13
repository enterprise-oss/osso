# frozen_string_literal: true

module Models
  # Subclass for Azure / ADFS IDP instances
  class AzureSamlProvider < Models::SamlProvider
    def saml_options
      attributes.slice(
        'domain',
        'idp_cert',
        'idp_sso_target_url',
      ).merge(
        issuer: "id:#{id}",
      ).symbolize_keys
    end
  end
end
