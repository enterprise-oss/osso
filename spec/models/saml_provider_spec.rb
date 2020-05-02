# frozen_string_literal: true

require 'spec_helper'

describe Models::SamlProvider do
  subject { create(:okta_saml_provider) }

  describe '.create' do
    it 'creates an enterprise account' do
      domain = Faker::Internet.domain_name

      provider = described_class.create(
        domain: domain,
        provider: 'Models::OktaSamlProvider',
      )

      expect(provider.enterprise_account).to be_a(Models::EnterpriseAccount)
      expect(provider.enterprise_account.domain).to eq(domain)
    end
  end

  describe '#assertion_consumer_service_url' do
    it 'returns the expected URI' do
      ENV['BASE_URL'] = 'https://example.com'

      expect(subject.assertion_consumer_service_url).to eq(
        "https://example.com/auth/saml/#{subject.id}/callback",
      )
    end
  end
end
