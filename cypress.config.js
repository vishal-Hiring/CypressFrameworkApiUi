const { defineConfig } = require("cypress");

module.exports = defineConfig({
  experimentalModifyObstructiveThirdPartyCode : true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl:'https://practicetestautomation.com',
    "defaultCommandTimeout": 10000, // Set to a higher value if needed
    "responseTimeout": 30000,
    testIsolation:false,
    "experimentalOriginDependencies":true,
    failOnStatusCode:false,
    cacheAcrossSpecs:false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});
