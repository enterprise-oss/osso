# frozen_string_literal: true

module Resolvers
  class EnterpriseAccount < GraphQL::Schema::Resolver
    type Types::EnterpriseAccount, null: false

    def resolve(args)
      return unless admin? || enterprise_authorized?(args[:domain])

      Osso::Models::EnterpriseAccount.find_by(domain: args[:domain])
    end

    def admin?
      context[:scope] == :admin
    end

    def enterprise_authorized?(domain)
      context[:scope] == domain
    end
  end
end
