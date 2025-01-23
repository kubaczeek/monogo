# Bejamas interview task

## Features

- End-to-end tests for mobile and desktop

# Getting Started

## Prerequisites

- Node.js v14 or higher
- NPM v6 or higher


# Installation

1. Navigate to the project directory:
   ```
   cd root directory
   ```
2. Install the required dependencies:
   ```
   npm install
   ```
3. Install browsers
   ```
   npx playwright install
   ```

# Running Tests in code editor

The best way to run the test is to get extension for playwright

- VS Code https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright
- Webstorm https://plugins.jetbrains.com/plugin/20175-test-automation


# Run test from CLI
# Run desktop tests

Executed command will show playwright report automatically

- npm run ploom_dekstop_pl_tests
- npm run ploom_dekstop_uk_tests

# Run mobile tests

- npm run ploom_mobile_pl_tests  
- npm run ploom_mobile_uk_tests  


# Reporting

To get detailed report from all runs run this command:

You need to install allure cli https://allurereport.org/docs/install/

- allure serve

