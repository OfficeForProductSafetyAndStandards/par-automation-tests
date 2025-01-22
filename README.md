# par-automation-tests
Primary Authority Register (PAR)  Automation Test 

## Overview

The PAR Automation Tests project is designed to automate the testing of the Primary Authority Register (PAR) application.
This repository includes frameworks and test scripts for UI, API, and Accessibility testing,
ensuring comprehensive coverage of functional and non-functional requirements.

## Key Features
UI Testing: Automated end-to-end tests for validating user workflows using Playwright and Cucumber.js.

API Testing: Automated API tests for verifying request/response interactions and data flows.

Accessibility Testing: Accessibility checks integrated with Axe Core to ensure compliance with WCAG 2.2 standards.

## Tools and Technologies
- [**Playwright**](https://playwright.dev): For browser automation and testing.
- [**Cucumber.js**](https://cucumber.io/docs/installation/javascript/): For behavior-driven development (BDD) and readable test scenarios.
- [**Axe Core**](https://www.deque.com/axe/): For accessibility testing and WCAG compliance validation.
- **Node.js**: Runtime for running the JavaScript-based framework.

## Running Tests
### Prerequisites
Ensure you have the following installed:
Node.js (v14 or higher)
npm or yarn
Browsers supported by Playwright: Chromium, Firefox, Webkit, and Edge.
Install dependencies by running:
```bash
npm install
```

## Running Tests on Different Browsers
Use the following npm scripts to run tests on specific browsers:
Default Browser (Chromium):
```bash
npm run ui:tests
```
Firefox:
```bash
npm run ui:tests:firefox
```
Safari:
```bash
npm run ui:tests:safari
```
Microsoft Edge:
```bash
npm run ui:tests:edge
```
## Running Tests on Devices
You can also run tests on emulated mobile devices:

iPhone 12
```bash
npm run ui:tests:iphone
```
Android (Pixel 5):
```bash
npm run ui:tests:andriod
```
iPad Pro 11:
```bash
npm run ui:tests:ipad
```
## Running Tests in Parallel
To execute tests in parallel, use the --parallel flag in the scripts. For example:
```bash
 --parallel 2
```
## Running Tests on Different Environments
By default, tests run against the test environment. You can specify different environments using the NODE_ENV variable:
Test Environment:
```bash
NODE_ENV=test
```
Dev Environment:
```bash
NODE_ENV=dev
```
Stage Environment:
```bash
NODE_ENV=stage
```
Ensure you have corresponding .env.<environment> files configured for each environment.

## Running API tests
```bash
npm run api:tests
```


## Generating Reports
Test reports are generated in the playwright/report/ directory:
```bash
npm run customised:cucumber:report
```
JSON Report: playwright/report/report.json

Videos: playwright/report/video/

Screenshots: playwright/report/screenshots/

These reports can be used for debugging and sharing test results with stakeholders.
