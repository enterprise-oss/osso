# frozen_string_literal: true

require 'rubygems'
require 'bundler'
require 'vcr'
require 'rack/test'
require 'rack/vcr'

Bundler.require

require './app'

VCR.configure do |config|
  config.cassette_library_dir = './spec/support/vcr_cassettes'
end

run App
