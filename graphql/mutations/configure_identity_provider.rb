# frozen_string_literal: true

module Mutations
  class ConfigureIdentityProvider < BaseMutation
    null false
    argument :id, ID, required: true
    argument :provider, Types::IdentityProviderService, required: true
    argument :idp_sso_target_url, String, required: true
    argument :idp_cert, String, required: true

    field :identity_provider, Types::IdentityProvider, null: false
    field :errors, [String], null: false

    def resolve(args)
      provider = Osso::Models::SamlProivder.find(args.delete(:id))
      provider.update(args)

      return_data(identity_provider: provider)
    rescue StandardError => e
      return_error(errors: e.full_message)
    end
  end
end
