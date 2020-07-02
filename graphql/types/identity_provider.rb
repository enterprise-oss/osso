# frozen_string_literal: true

require 'graphql'

module Types
  class IdentityProvider < Types::BaseObject
    description 'Represents a SAML based IDP instance for an EnterpriseAccount'
    implements GraphQL::Types::Relay::Node

    global_id_field :gid
    field :id, ID, null: false
    field :enterprise_Account_id, ID, null: false
    field :service, Types::IdentityProviderService, null: true
    field :domain, String, null: false
    field :acs_url, String, null: false
    field :sso_url, String, null: true
    field :sso_cert, String, null: true
    field :configured, Boolean, null: false

    def service
      @object.provider
    end

    def configured
      @object.idp_sso_target_url && @object.idp_cert
    end

    def sso_cert
      @object.idp_cert
    end

    def sso_url
      @object.idp_sso_target_url
    end
  end
end
