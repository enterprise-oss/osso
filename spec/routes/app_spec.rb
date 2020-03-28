# frozen_string_literal: true

require 'spec_helper'

describe 'App' do
  describe 'get /' do
    it 'renders a containing div for the client app' do
      allow_any_instance_of(App).to receive(:current_user).and_return(true)

      get '/'

      expect(last_response.body).to match('<div id="root"></div>')
    end
  end
end
