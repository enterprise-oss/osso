# frozen_string_literal: true

require 'dotenv/load'
require 'dotenv/tasks' if defined? Dotenv
require 'osso'
require './app'
require 'osso/rake'
require 'sinatra/activerecord/rake'

osso = Gem::Specification.find_by_name('osso')
osso_rakefile = "#{osso.gem_dir}/lib/osso/Rakefile"
load osso_rakefile

Dir.glob('lib/tasks/*.rake').each { |r| load r }
