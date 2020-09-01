/* eslint-disable @typescript-eslint/no-var-requires */
// plugins/downloads.js

const path = require("path");
const { promisify } = require("util");
const CDP = require("chrome-remote-interface");
const debug = require("debug")("cypress:server:protocol");
const rimraf = promisify(require("rimraf"));

let port = 0;
let client = null;

module.exports = (on, config) => {
  const downloadPath = path.resolve(config.projectRoot, "./cypress/downloads");

  function ensureRdpPort(args) {
    args.push(`--remote-debugging-port=9292`);

    return port;
  }

  async function resetCRI() {
    if (client) {
      debug("resetting CRI client");
      await client.close();
      client = null;
    }
  }

  async function cleanDownloads() {
    debug(`cleaning up downloads at ${downloadPath}`);

    await rimraf(downloadPath);
  }

  async function allowDownloads() {
    await resetCRI();
    await cleanDownloads();

    debug(`enabling downloads at ${downloadPath}`);

    client = client || (await CDP({ port }));

    return client.send("Browser.setDownloadBehavior", {
      behavior: "allow",
      downloadPath,
    });
  }

  on("before:browser:launch", (browser, launchOptionsOrArgs) => {
    debug("browser launch args or options %o", launchOptionsOrArgs);

    const args = Array.isArray(launchOptionsOrArgs)
      ? launchOptionsOrArgs
      : launchOptionsOrArgs.args;

    port = ensureRdpPort(args);

    debug("ensureRdpPort %d", port);
    debug("Chrome arguments %o", args);
  });

  return {
    resetCRI,
    allowDownloads,
    cleanDownloads,
  };
};
