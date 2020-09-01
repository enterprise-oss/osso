/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const downloads = require("./downloads");
const chromium = require("chromium");
const execa = require("execa");

module.exports = async (on, config) => {
  on("task", downloads(on, config));

  const hasChromium = config.browsers.some(
    (browser) => browser.name === "chromium"
  );

  if (!hasChromium) {
    const { stdout } = await execa(chromium.path, ["--version"]);
    const [version] = /[\d\.]+/.exec(stdout);
    const majorVersion = parseInt(version.split(".")[0]);

    // Note: this extends the global config!
    return {
      browsers: [
        ...config.browsers,
        {
          name: "chromium",
          family: "chromium",
          channel: "stable",
          displayName: "Chromium (npm)",
          path: chromium.path,
          version,
          majorVersion,
        },
      ],
    };
  }
};
