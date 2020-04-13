# frozen_string_literal: true

require 'omniauth'

module OmniAuth
  module Strategies
    class SamlBox
      include OmniAuth::Strategy

      def request_phase
        redirect client.auth_code.authorize_url({ redirect_uri: callback_url }.merge(options.authorize_params))
      end
    end
  end
end
