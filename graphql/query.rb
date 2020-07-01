# frozen_string_literal: true

module Types
  class QueryType < GraphQL::Schema::Object
    # field :node, field: GraphQL::Relay::Node.field
    field :enterprise_account, null: false, resolver: Resolvers::EnterpriseAccount do
      argument :domain, String, required: true
    end
    field :enterprise_accounts, null: true, resolver: Resolvers::EnterpriseAccounts
    field :oauth_clients, null: true, resolver: Resolvers::OAuthClients

    field(
      :identity_provider,
      Types::IdentityProvider,
      null: true,
      resolve: ->(_obj, args, _context) { Osso::Models::SamlProvider.find(args[:id]) },
    ) do
      argument :id, ID, required: true
    end

    # field(
    #   :viewer,
    #   Types::User,
    #   null: true,
    #   resolve: ->(_obj, _args, context) { context[:current_user] },
    # )
  end
end
