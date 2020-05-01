# frozen_string_literal: true

require 'securerandom'

module OAuth2Token
  def self.included(klass)
    klass.class_eval do
      cattr_accessor :default_lifetime
      self.default_lifetime = 1.minute
      belongs_to :user
      belongs_to :oauth_client

      before_validation :setup, on: :create
      validates :oauth_client, :expires_at, presence: true
      validates :token, presence: true, uniqueness: true

      scope :valid, -> { where('expires_at > ?', Time.now.utc) }
    end
  end

  def expires_in
    (expires_at - Time.now.utc).to_i
  end

  def expired!
    self.expires_at = Time.now.utc
    save!
  end

  private

  def setup
    self.token = SecureRandom.hex(32)
    self.expires_at ||= default_lifetime.from_now
  end
end
