#!/bin/bash

set -euo pipefail

PREFIX = '/var/lib/buildkite-agent/builds/enterprise-oss-bk-1/enterpriseoss/osso/'

install_reporter() {
  if [ -f ./cc-test-reporter ]; then
    printf -- "--- :codeclimate: Using local binary ./cc-test-reporter"
  else
    printf -- "--- :codeclimate: Installing %s cc-test-reporter\\n" "latest"

    curl --location --silent \
      "https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64" > ./cc-test-reporter
    chmod +x ./cc-test-reporter
  fi
}

download_artifacts() {
  printf -- "--- :buildkite: downloading artifact\\n"
  # Ruby
  buildkite-agent artifact download "coverage/.resultset.json" ./

  # TS
  buildkite-agent artifact download "coverage/lcov.info" ./
}

combine_reports() {
  # Ruby
   printf -- "Formatting file: %s\\n" "$1"
  ./cc-test-reporter format-coverage ${debug:+"-d"} \
    --input-type "simplecov" \
    --prefix ${PREFIX}
    --output "coverage/codeclimate.ruby.json" \
    "./coverage/.resultset.json"
 
  # TS
  printf -- "Formatting file: %s\\n" "$1"
    ./cc-test-reporter format-coverage ${debug:+"-d"} \
      --input-type "lcov" \
      --prefix ${PREFIX}
      --output "coverage/codeclimate.ts.json" \
      "./coverage/lcov.info"
}

report_coverage() {
  printf -- "--- :codeclimate: reporting coverage\\n"
  ./cc-test-reporter sum-coverage ${debug:+"-d"} ${SUM_PARTS} coverage/codeclimate.*.json

  ./cc-test-reporter upload-coverage ${debug:+"-d"}
}

if [[ -z "${BUILDKITE_PLUGIN_CODECLIMATE_TEST_REPORTER_VERSION:-}" ]] ; then
  BUILDKITE_PLUGIN_CODECLIMATE_TEST_REPORTER_VERSION="latest"
fi

debug=""
[[ -v BUILDKITE_PLUGIN_CODECLIMATE_TEST_REPORTER_DEBUG ]] && debug="yes"

install_reporter
download_artifacts
format_reports
report_coverage
