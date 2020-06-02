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
    field :provider, Types::SamlProvider, null: true
    field :status, String, null: false

    def name
      object.domain.gsub('.com', '')
    end

    def status
      'active'
    end

    def provider
      object.provider || object.saml_providers.create(domain: object.domain)
    end
  end
end
