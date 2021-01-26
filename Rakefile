# frozen_string_literal: true

require 'dotenv/load' unless ENV['RACK_ENV']

require './app'
require 'osso'
require 'sinatra/activerecord/rake'

if ENV['RACK_ENV'] == 'production'
  Mail.defaults do
    delivery_method :smtp, {
      port: ENV['SMTP_PORT'],
      address: ENV['SMTP_SERVER'],
      user_name: ENV['SMTP_LOGIN'],
      password: ENV['SMTP_PASSWORD'],
      domain: (ENV['SMTP_DOMAIN']).to_s,
      authentication: :plain,
    }
  end
end

osso = Gem::Specification.find_by_name('osso')
osso_rakefile = "#{osso.gem_dir}/lib/osso/Rakefile"
load osso_rakefile

Dir.glob("#{osso.gem_dir}/lib/tasks/*.rake").each { |r| load r }
Dir.glob('lib/tasks/*.rake').each { |r| load r }
