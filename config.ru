# frozen_string_literal: true

require 'rubygems'
require 'bundler'
require 'rack/test'

Bundler.require

require './app'

run App
