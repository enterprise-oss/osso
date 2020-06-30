# frozen_string_literal: true

module Mutations
  class SetSamlProvider < BaseMutation
    null false

    argument :provider, Types::IdentityProviderService, required: true
    argument :id, ID, required: true

    field :identity_provider, Types::IdentityProvider, null: false
    field :errors, [String], null: false

    def resolve(provider:, id:)
      saml_provider = Osso::Models::SamlProvider.find(id)
      saml_provider.provider = provider
      saml_provider.save!
      {
        saml_provider: saml_provider,
        errors: [],
      }
    end
  end
end
