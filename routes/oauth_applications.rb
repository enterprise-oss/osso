# frozen_string_literal: true

module Routes
  module OauthApplications
    extend Sinatra::Extension

    get 'applications' do
      # doorkeeper/applications#index
    end

    post 'applications' do
      # doorkeeper/applications#create
    end

    get 'applications/:id' do
      # doorkeeper/applications#show
    end

    delete 'applications/:id' do
      # doorkeeper/applications#destroy
    end
  end
end
