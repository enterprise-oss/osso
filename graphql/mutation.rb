# frozen_string_literal: true

require_relative 'mutations'

module Types
  class MutationType < BaseObject
    field :create_identity_provider, mutation: Mutations::CreateIdentityProvider

    field :set_saml_provider, mutation: Mutations::SetSamlProvider
  end
end
