# frozen_string_literal: true

module Mutations
  class CreateIdentityProvider < BaseMutation
    null false
    argument :enterprise_account_id, ID, required: true
    argument :provider_service, Types::IdentityProviderService, required: true

    field :identity_provider, Types::IdentityProvider, null: false
    field :errors, [String], null: false

    def resolve(enterprise_account_id:, provider_service:)
      enterprise_account = Osso::Models::EnterpriseAccount.find(enterprise_account_id)
      identity_provider = enterprise_account.saml_providers.create!(
        provider: provider_service,
        domain: enterprise_account.domain,
      )

      return_data(identity_provider: identity_provider)
    rescue StandardError => e
      return_error(errors: e.full_message)
    end
  end
end
