# frozen_string_literal: true

require 'jwt'

module Routes
  module Admin
    extend Sinatra::Extension

    helpers do
      def protected!
        return if authorized?

        redirect ENV['JWT_URL']
      end

      def token
        @token ||= request.env['admin_token'] ||
          request['admin_token'] ||
          session['admin_token']
      end

      def authorized?
        JWT.decode(
          token,
          ENV['JWT_HMAC_SECRET'],
          true,
          { algorithm: 'HS256' },
        )

        session['admin_token'] = token
      rescue JWT::DecodeError
        false
      end
    end

    get '/admin' do
      protected!

      erb :admin
    end
  end
end
