# frozen_string_literal: true

require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
require 'osso'
require './app'

osso = Gem::Specification.find_by_name('osso')
osso_rakefile = "#{osso.gem_dir}/lib/osso/Rakefile"
load osso_rakefile

Dir.glob('lib/tasks/*.rake').each { |r| load r }
