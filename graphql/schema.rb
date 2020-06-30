# frozen_string_literal: true

require 'graphql'
require_relative 'types'
require_relative 'resolvers'
require_relative 'mutation'
require_relative 'query'

GraphQL::Relay::BaseConnection.register_connection_implementation(
  ActiveRecord::Relation,
  GraphQL::Relay::RelationConnection,
)

class OssoSchema < GraphQL::Schema
  query Types::QueryType
  mutation Types::MutationType
  use GraphQL::Pagination::Connections

  def self.id_from_object(object, _type_definition = nil, _query_ctx = nil)
    GraphQL::Schema::UniqueWithinType.encode(object.class.name, object.id)
  end

  def self.object_from_id(id, _query_ctx = nil)
    class_name, item_id = GraphQL::Schema::UniqueWithinType.decode(id)
    Object.const_get(class_name).find(item_id)
  end

  def self.resolve_type(_type, obj, _ctx)
    case obj
    when Osso::Models::EnterpriseAccount
      Types::EnterpriseAccount
    when Osso::Models::SamlProvider
      Types::IdentityProvider
    else
      raise("Unexpected object: #{obj}")
    end
  end
end
