# frozen_string_literal: true

module Routes
  module Oauth
    extend Sinatra::Extension

    get 'authorize' do
      # oauth_authorization
    end

    delete 'authorize' do
      # doorkeeper/authorizations#destroy
    end

    post 'authorize' do
      # doorkeeper/authorizations#create
    end

    post 'token' do
      # doorkeeper/tokens#create
    end

    post 'revoke' do
      # doorkeeper/tokens#revoke
    end

    post 'introspect' do
      # oauth_introspect
    end
  end
end
