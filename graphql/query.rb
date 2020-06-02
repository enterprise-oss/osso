# frozen_string_literal: true

module Types
  class QueryType < GraphQL::Schema::Object
    # field :node, field: GraphQL::Relay::Node.field
    field :enterprise_account, null: false, resolver: Resolvers::EnterpriseAccount do
      argument :domain, String, required: true
    end
    field :enterprise_accounts, null: true, resolver: Resolvers::EnterpriseAccounts

    # field(
    #   :viewer,
    #   Types::User,
    #   null: true,
    #   resolve: ->(_obj, _args, context) { context[:current_user] },
    # )
  end
end
