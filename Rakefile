# frozen_string_literal: true

require 'dotenv/load' unless ENV['RACK_ENV']

require './app'
require 'osso'
require 'sinatra/activerecord/rake'

osso = Gem::Specification.find_by_name('osso')
osso_rakefile = "#{osso.gem_dir}/lib/osso/Rakefile"
load osso_rakefile

Dir.glob("#{osso.gem_dir}/lib/tasks/*.rake").each { |r| load r }
Dir.glob('lib/tasks/*.rake').each { |r| load r }
