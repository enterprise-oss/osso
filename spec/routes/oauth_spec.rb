# frozen_string_literal: true

require 'spec_helper'

describe Routes::Oauth do
  describe 'get /oauth/authorize' do
    describe 'with a valid client ID and redirect URI' do
      let(:client) { create(:oauth_client) }

      describe 'for a domain that does not belong to an enterprise' do
        it '404s' do
          create(:enterprise_with_okta, domain: 'foo.com')

          get(
            '/oauth/authorize',
            domain: 'bar.org',
            client_id: client.identifier,
            response_type: 'code',
            redirect_uri: client.redirect_uris.sample,
          )

          expect(last_response.status).to eq(404)
        end
      end

      describe 'for an enterprise domain with one SAML provider' do
        it 'redirects to /auth/saml/:provider_id' do
          enterprise = create(:enterprise_with_okta)

          get(
            '/oauth/authorize',
            domain: enterprise.domain,
            client_id: client.identifier,
            response_type: 'code',
            redirect_uri: client.redirect_uris.sample,
          )

          provider_id = enterprise.saml_providers.first.id

          expect(last_response).to be_redirect
          follow_redirect!
          expect(last_request.url).to match("auth/saml/#{provider_id}")
        end
      end

      describe 'for an enterprise domain with multiple SAML providers' do
        it 'renders the multiple providers screen' do
          enterprise = create(:enterprise_with_multiple_providers)

          get(
            '/oauth/authorize',
            domain: enterprise.domain,
            client_id: client.identifier,
            response_type: 'code',
            redirect_uri: client.redirect_uris.sample,
          )

          expect(last_response).to be_ok
        end
      end

      describe 'post /oauth/token' do
        describe 'with a valid unexpired code, client secret, client ID and redirect URI' do
          it 'returns the user' do
            user = create(:user)
            code = user.authorization_codes.valid.first

            post(
              '/oauth/token',
              client_id: client.identifier,
              client_secret: client.secret,
              grant_type: 'authorization_code',
              redirect_uri: code.redirect_uri,
              code: code.token,
            )

            expect(last_response.status).to eq(200)
            expect(last_json_response).to eq(
              user: {
                email: user.email,
                id: user.id,
              },
            )
          end
        end

        describe 'with a valid unexpired code, client secret, client ID and redirect URI' do
          it 'returns the user' do
            user = create(:user)
            code = user.authorization_codes.valid.first

            post(
              '/oauth/token',
              client_id: client.identifier,
              client_secret: client.secret,
              response_type: 'authorization_grant',
              redirect_uri: code.redirect_uri,
              code: code.token,
            )

            expect(last_response.status).to eq(200)
          end
        end
      end
    end
  end
end
