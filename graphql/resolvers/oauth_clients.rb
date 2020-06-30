# frozen_string_literal: true

module Resolvers
  class OAuthClients < GraphQL::Schema::Resolver
    type [Types::OAuthClient], null: true

    def resolve
      return Osso::Models::OAuthClient.all if context[:scope] == :admin
    end
  end
end
