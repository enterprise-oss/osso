# frozen_string_literal: true

require 'spec_helper'

describe Routes::Auth do
  describe 'post /auth/saml/:uuid/callback' do
    describe 'for an Okta SAML provider' do
      let(:enterprise) { create(:enterprise_with_okta) }
      let(:okta_provider) { enterprise.saml_providers.first }

      describe "on the user's first authentication" do
        it 'creates a user' do
          mock_saml_omniauth

          expect do
            post(
              "/auth/saml/#{okta_provider.id}/callback",
              nil,
              {
                'omniauth.auth' => OmniAuth.config.mock_auth[:saml],
                'saml_provider' => okta_provider,
              },
            )
          end.to change { Models::User.count }.by(1)
        end

        it 'creates an authorization_code' do
          mock_saml_omniauth

          expect do
            post(
              "/auth/saml/#{okta_provider.id}/callback",
              nil,
              {
                'omniauth.auth' => OmniAuth.config.mock_auth[:saml],
                'saml_provider' => okta_provider,
              },
            )
          end.to change { Models::AuthorizationCode.count }.by(1)
        end
      end

      describe 'on subsequent authentications' do
        let!(:enterprise) { create(:enterprise_with_okta) }
        let!(:okta_provider) { enterprise.saml_providers.first }
        let(:user) { create(:user, saml_provider_id: okta_provider.id) }

        before do
          mock_saml_omniauth(email: user.email, id: user.idp_id)
        end

        it 'creates a user' do
          expect do
            post(
              "/auth/saml/#{okta_provider.id}/callback",
              nil,
              {
                'omniauth.auth' => OmniAuth.config.mock_auth[:saml],
                'saml_provider' => okta_provider,
              },
            )
          end.to_not(change { Models::User.count })
        end
      end
    end

    describe 'for an (Azure) ADFS SAML provider' do
      let(:enterprise) { create(:enterprise_with_azure) }
      let(:azure_provider) { enterprise.provider }

      describe "on the user's first authentication" do
        it 'creates a user' do
          mock_saml_omniauth

          expect do
            post(
              "/auth/saml/#{azure_provider.id}/callback",
              nil,
              {
                'omniauth.auth' => OmniAuth.config.mock_auth[:saml],
                'saml_provider' => azure_provider,
              },
            )
          end.to change { Models::User.count }.by(1)
        end
      end

      describe 'on subsequent authentications' do
        let!(:enterprise) { create(:enterprise_with_azure) }
        let!(:azure_provider) { enterprise.provider }
        let(:user) { create(:user, saml_provider_id: azure_provider.id) }

        before do
          mock_saml_omniauth(email: user.email, id: user.idp_id)
        end

        it 'creates a user' do
          expect do
            post(
              "/auth/saml/#{azure_provider.id}/callback",
              nil,
              {
                'omniauth.auth' => OmniAuth.config.mock_auth[:saml],
                'saml_provider' => azure_provider,
              },
            )
          end.to_not(change { Models::User.count })
        end
      end
    end
  end
end
