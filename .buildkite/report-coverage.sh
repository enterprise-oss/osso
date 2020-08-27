#!/bin/bash

set -euo pipefail

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
  printf -- "--- :buildkite: downloading artifacts\\n"
  # Ruby
  buildkite-agent artifact download "coverage/.resultset.json" ./

  # TS
  buildkite-agent artifact download "coverage/lcov.info" ./
}

format_reports() {
  # Ruby
   printf -- "Formatting simplecov\\n"
  ./cc-test-reporter format-coverage \
    --input-type "simplecov" \
    --prefix ${PREFIX} \
    --output "coverage/codeclimate.ruby.json" \
    "./coverage/.resultset.json"
 
  # TS
  printf -- "Formatting lcov\\n"
    ./cc-test-reporter format-coverage \
      --input-type "lcov" \
      --prefix ${PREFIX} \
      --output "coverage/codeclimate.ts.json" \
      "./coverage/lcov.info"
}

report_coverage() {
  printf -- "--- :codeclimate: reporting coverage\\n"
  ./cc-test-reporter sum-coverage --parts 2 coverage/codeclimate.*.json

  ./cc-test-reporter upload-coverage
}

PREFIX='/var/lib/buildkite-agent/builds/enterprise-oss-bk-1/enterpriseoss/osso/'

install_reporter
download_artifacts
format_reports
report_coverage
