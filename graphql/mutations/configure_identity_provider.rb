# frozen_string_literal: true

module Mutations
  class ConfigureIdentityProvider < BaseMutation
    null false
    argument :id, ID, required: true
    # argument :provider, Types::IdentityProviderService, required: true
    argument :sso_url, String, required: true
    argument :sso_cert, String, required: true

    field :identity_provider, Types::IdentityProvider, null: true
    field :errors, [String], null: false

    def resolve(id:, sso_url:, sso_cert:)
      provider = Osso::Models::SamlProvider.find(id)
      provider.update(
        idp_cert: sso_cert,
        idp_sso_target_url: sso_url,
      )

      return_data(identity_provider: provider)
      # rescue StandardError => e
      #   return_error(errors: e.full_message)
    end
  end
end
