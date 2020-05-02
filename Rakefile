# frozen_string_literal: true

require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
require './app'

osso = Gem::Specification.find_by_name('osso')
Dir.glob("#{osso.gem_dir}/lib/tasks/*.rake").each { |r| load r }
Dir.glob('lib/tasks/*.rake').each { |r| load r }
