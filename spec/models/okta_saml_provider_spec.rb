# frozen_string_literal: true

require 'spec_helper'

describe Models::OktaSamlProvider do
  subject { create(:okta_saml_provider) }

  describe '#saml_options' do
    it 'returns the required args' do
      expect(subject.saml_options)
        .to match(
          domain: subject.domain,
          idp_cert: subject.idp_cert,
          idp_sso_target_url: subject.idp_sso_target_url,
          issuer: subject.id,
          name_identifier_format: described_class::NAME_FORMAT,
        )
    end
  end
end
