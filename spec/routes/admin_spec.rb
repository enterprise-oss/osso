# frozen_string_literal: true

require 'spec_helper'

xdescribe Osso::Admin do
  let(:jwt_url) { 'https://foo.com/jwt' }
  let(:jwt_hmac_secret) { SecureRandom.hex(32) }

  before do
    ENV['JWT_URL'] = jwt_url
    ENV['JWT_HMAC_SECRET'] = jwt_hmac_secret
  end

  describe 'get /admin' do
    it 'redirects to JWT_URL without a session or token' do
      get('/admin')
      expect(last_response).to be_redirect
      follow_redirect!
      expect(last_request.url).to eq(jwt_url)
    end

    it 'redirects to JWT_URL with an invalid token' do
      get('/admin', token: SecureRandom.hex(32))

      expect(last_response).to be_redirect
      follow_redirect!
      expect(last_request.url).to eq(jwt_url)
    end

    it 'chomps the token and redirects to request path with valid token in query params' do
      token = JWT.encode(
        { email: 'admin@saas.com', scope: 'admin' },
        jwt_hmac_secret,
        'HS256',
      )

      get('/admin', { admin_token: token })

      expect(last_response).to be_redirect
      follow_redirect!
      expect(last_request.url).to match('/admin')
    end

    it 'renders the admin page for a token in session' do
      token = JWT.encode(
        { email: 'admin@saas.com', scope: 'admin' },
        jwt_hmac_secret,
        'HS256',
      )

      get('/admin', {}, 'rack.session' => { admin_token: token })
      expect(last_response).to be_ok
    end
  end
end
