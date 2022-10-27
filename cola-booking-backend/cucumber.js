// cucumber.js
let common = [
  '--publish-quiet',
  'features/**/*.feature',                // Specify our feature files
  '--require-module ts-node/register',    // Load TypeScript module
  '--require step-definitions/**/*.ts',   // Load step definitions
  '--format progress',                // Load custom formatter
  '--format html',                // Load custom formatter
  '-f @cucumber/pretty-formatter',
].join(' ');

let cola_booking = [
  'apps/cola-booking/test/acceptance/features/**/*.feature',                // Specify our feature files
  '--require-module ts-node/register',    // Load TypeScript module
  '--require-module tsconfig-paths/register',
  '--require apps/cola-booking/test/acceptance/step-definitions/**/*.steps.ts',   // Load step definitions
  //'--format progress',                // Load custom formatter
  '--format html:test-acceptance-report.html',                // Load custom formatter
  '--format @cucumber/pretty-formatter',
  '--publish-quiet',
  //'--tags @reservation'
  //'--publish',
].join(' ');

module.exports = {
  default: common,
  cola_booking: cola_booking
};
