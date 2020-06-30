# frozen_string_literal: true

require 'graphql'

module Types
  class EnterpriseAccount < Types::BaseObject
    description 'An Account for a company that wishes to use SAML via Osso'
    implements GraphQL::Types::Relay::Node

    global_id_field :gid
    field :id, ID, null: false
    field :name, String, null: false
    field :domain, String, null: false
    field :identity_providers, [Types::IdentityProvider], null: true
    field :status, String, null: false

    def name
      object.domain.gsub('.com', '')
    end

    def status
      'active'
    end

    def identity_providers
      object.saml_providers
    end
  end
end
