# frozen_string_literal: true

require 'graphql'
require_relative 'base_object'
module Types
  class User < Types::BaseObject
    description 'A User of the application'

    field :id, ID, null: false
    field :name, String, null: true
  end
end
