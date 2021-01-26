#!/bin/sh

set -e

if [ -f /app/tmp/pids/server.pid ]; then
  rm /app/tmp/pids/server.pid
fi

# this would blow up the db if the migration failed for any reason.
# prob not the best approach!
# bundle exec rake db:migrate 2>/dev/null || bundle exec rake db:setup

exec "$@"