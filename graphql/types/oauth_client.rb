# frozen_string_literal: true

require 'graphql'

module Types
  class OAuthClient < Types::BaseObject
    description 'An OAuth client used to consume Osso SAML users'
    implements GraphQL::Types::Relay::Node

    global_id_field :gid
    field :id, ID, null: false
    field :name, String, null: false
    field :client_id, String, null: false
    field :client_secret, String, null: false
  end
end
