desc "Build assets for non-React pages"
task :assets_precompile do
  sh('yarn parcel build assets/end-user.css assets/admin.css assets/end-user.js --dist-dir public')
end
