# frozen_string_literal: true

require 'osso'
require './app'
require 'osso/rake'

osso = Gem::Specification.find_by_name('osso')
osso_rakefile = "#{osso.gem_dir}/lib/osso/Rakefile"
load osso_rakefile

Dir.glob('lib/tasks/*.rake').each { |r| load r }
