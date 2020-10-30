# frozen_string_literal: true

require 'spec_helper'

xdescribe App do
  let(:jwt_url) { 'https://foo.com/jwt' }
  let(:jwt_hmac_secret) { SecureRandom.hex(32) }
  let(:valid_token) do
    JWT.encode(
      { email: 'admin@saas.com', scope: 'admin' },
      jwt_hmac_secret,
      'HS256',
    )
  end

  before do
    ENV['JWT_HMAC_SECRET'] = jwt_hmac_secret
  end

  describe 'post /graphql' do
    it 'returns 401 unauthorized without a session or token' do
      post('/graphql')

      expect(last_response.status).to eq(401)
    end

    it 'returns 401 unauthorized with an invalid token' do
      post('/graphql', admin_token: SecureRandom.hex(32))

      expect(last_response.status).to eq(401)
    end

    it 'executes the GraphQL schema with valid token in query params' do
      allow(Osso::GraphQL::Schema).to receive(:execute)

      post('/graphql', { admin_token: valid_token })

      expect(Osso::GraphQL::Schema).to have_received(:execute).once
    end

    it 'executes the GraphQL schema with valid token in session' do
      allow(Osso::GraphQL::Schema).to receive(:execute)

      get('/admin', {}, 'rack.session' => { admin_token: valid_token })
      expect(last_response).to be_ok
    end
  end
end
