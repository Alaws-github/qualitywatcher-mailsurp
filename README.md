# QualityWatcher-Automation
Automation Suite for the QualityWatcher project

## Getting Started
Clone this repository:
```sh
$ git clone https://github.com/QualityWorksCG/qualitywatcher-automation.git
$ cd QualityWatcher-Automation
$ npm install
```

## Executing Tests

ENV=stg npm test - runs all tests/specs <br />

ENV=stg npm run register - runs tests in the specified suite. In this case, the register suite<br />
## Generating Test Report

From the root of the project, run the following command: `allure generate --clean && allure open` <br />

This generates and opens the allure report locally, displaying all test results that are currently in the `allure-results` directory. <br />

Results from the report can also be downloaded as a csv file while in the allure interface for sharing.


