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

    get 'applications/new' do
      # doorkeeper/applications#new
    end

    get 'applications/:id' do
      # doorkeeper/applications#show
    end

    put 'applications/:id' do
      # doorkeeper/applications#update
    end

    delete 'applications/:id' do
      # doorkeeper/applications#destroy
    end
  end
end
