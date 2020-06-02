# frozen_string_literal: true

require 'graphql'

module Types
  class SamlProvider < Types::BaseObject
    description 'Represents a SAML based IDP instance for an EnterpriseAccount'
    implements GraphQL::Types::Relay::Node

    global_id_field :gid
    field :id, ID, null: false
    field :provider, Types::IdentityProvider, null: true
    field :domain, String, null: false
    field :acs_url, String, null: false
  end
end
