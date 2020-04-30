# frozen_string_literal: true

require 'jwt'

module Routes
  module Admin
    extend Sinatra::Extension
    helpers Helpers::Auth

    before do
      chomp_token
    end

    get '/admin' do
      admin_protected!

      erb :admin
    end

    get '/admin/enterprise/:domain' do
      enterprise_protected!(params[:domain])

      @enterprise = Models::EnterpriseAccount.where(
        domain: params[:domain],
      ).first_or_create

      erb :admin
    end
  end
end
