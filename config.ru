# frozen_string_literal: true

require 'rubygems'
require 'bundler'
require 'osso'

Bundler.require

require './app'

run Rack::URLMap.new(
  '/' => App,
  '/admin' => Osso::Admin,
  '/auth' => Osso::Auth,
  '/oauth' => Osso::Oauth,
)
