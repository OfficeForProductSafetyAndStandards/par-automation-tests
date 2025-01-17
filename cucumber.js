const common = `
  --require playwright/cucumber-runner/assertion.js
  --require playwright/cucumber-runner/hooks.js 
  --require playwright/step-definitions/**/*.js
  `;

module.exports = {
    default: `${common} playwright/features/**/*.feature`,
    strict: true,
};
