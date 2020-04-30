# frozen_string_literal: true

module Helpers
  module Auth
    def enterprise_protected!(domain)
      return if admin_authorized?
      return if enterprise_authorized?(domain)

      redirect ENV['JWT_URL']
    end

    def enterprise_authorized?(domain)
      JWT.decode(
        token,
        ENV['JWT_HMAC_SECRET'],
        true,
        { algorithm: 'HS256' },
      )

      payload[:scope] == domain
    rescue JWT::DecodeError
      false
    end

    def admin_protected!
      return if admin_authorized?

      redirect ENV['JWT_URL']
    end

    def admin_authorized?
      payload, _args = JWT.decode(
        token,
        ENV['JWT_HMAC_SECRET'],
        true,
        { algorithm: 'HS256' },
      )

      payload['scope'] == 'admin'
    rescue JWT::DecodeError
      false
    end

    def token
      request.env['admin_token'] || session['admin_token']
    end

    def chomp_token
      return unless request['admin_token'].present?

      session['admin_token'] = request['admin_token']
      redirect request.path
    end
  end
end
