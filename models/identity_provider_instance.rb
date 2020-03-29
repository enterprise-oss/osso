# frozen_string_literal: true

module Models
  class IdentityProviderInstance < ActiveRecord::Base
    def saml_options
      attributes.slice(
        'domain',
        'idp_cert',
        'idp_sso_target_url',
        # 'assertion_consumer_service_url',
      )
    end
  end
end
