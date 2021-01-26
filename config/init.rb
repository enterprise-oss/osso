# frozen_string_literal: true

module Init
  osso = Gem::Specification.find_by_name('osso')
  osso_migrations = "#{osso.gem_dir}/lib/osso/db/migrate"
  ActiveRecord::Tasks::DatabaseTasks.migrations_paths << osso_migrations
end
