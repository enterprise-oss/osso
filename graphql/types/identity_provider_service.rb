# frozen_string_literal: true

module Types
  class IdentityProviderService < BaseEnum
    value('AZURE', 'Microsoft Azure Identity Provider', value: 'Osso::Models::AzureSamlProvider')
    value('OKTA', 'Okta Identity Provider', value: 'Osso::Models::OktaSamlProvider')
  end
end
