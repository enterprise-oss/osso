# frozen_string_literal: true

# require 'dotenv/tasks'

require './app'
require 'osso'
require 'osso/rake'
require 'sinatra/activerecord/rake'

osso = Gem::Specification.find_by_name('osso')
osso_rakefile = "#{osso.gem_dir}/lib/osso/Rakefile"
load osso_rakefile

Dir.glob("#{osso.gem_dir}/lib/tasks/*.rake").each { |r| load r }
Dir.glob('lib/tasks/*.rake').each { |r| load r }
