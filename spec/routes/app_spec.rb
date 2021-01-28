# frozen_string_literal: true

require 'spec_helper'

describe App do  
  describe 'CORS protection' do
    describe 'from another origin server' do
      let(:origin) { 'https://' + Faker::Internet.domain_name }
      before do
        header 'Origin', origin
        header 'Access-Control-Request-Method', 'POST'
        header 'Content-Type', 'application/json'
        header 'Accept', 'application/json'
      end

      describe 'without a CORS origin allowed' do
        describe 'options /graphql' do
          it 'does not allow the origin to make a request' do
            options('/graphql')

            expect(last_response.headers['Access-Control-Allow-Origin']).to be nil
          end  
        end

        describe 'options /idp' do
          it 'does not allow the origin to make a request' do

            options('/idp')

            expect(last_response.headers['Access-Control-Allow-Origin']).to be nil
          end
        end  
      end

      describe 'with the CORS origin allowed' do
        before do
          ENV['CORS_ORIGIN'] = origin
        end

        describe 'options /graphql' do
          it 'allows the origin to make a POST request' do
            options('/graphql')

            expect(last_response.headers['Access-Control-Allow-Origin']).to eq(origin)
            expect(last_response.headers['Access-Control-Allow-Methods']).to match(/POST/)
          end  
        end

        describe 'options /idp' do
          it 'allows the origin to make a POST request' do
            options('/idp')

            expect(last_response.headers['Access-Control-Allow-Origin']).to eq(origin)
            expect(last_response.headers['Access-Control-Allow-Methods']).to match(/POST/)
          end
        end  
      end
    end
  end
end