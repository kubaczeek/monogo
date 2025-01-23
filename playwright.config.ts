import * as dotenv from "dotenv";
import { DotenvConfigOutput } from "dotenv";
import { defineConfig, devices } from "playwright/test";
import { Env } from "./data-types/enums/env";
import { Region } from "./data-types/enums/region";
import { Site } from "./data-types/enums/sites";

if (!process.env.ENV_FILE) {
  process.env.ENV_FILE = Env.Prod;
}

if (!process.env.ENV_REGION) {
  process.env.ENV_REGION = Region.PL;
}

if (!process.env.VERIFY_IMAGES) {
  process.env.VERIFY_IMAGES = "true";
}

if (!process.env.DEFAULT_TEST_TIMEOUT) {
  process.env.DEFAULT_TEST_TIMEOUT = "60";
}

let allureResultDir = "allure-results";

if (!process.env.DEFAULT_EXPECT_TIMEOUT) {
  process.env.DEFAULT_EXPECT_TIMEOUT = "15";
}

export let baseUrl = () =>
  getConfigFile().parsed["BASE_URL"] + "/" + process.env.ENV_REGION;
export let baseUrlWithoutRegion = () => getConfigFile().parsed["BASE_URL"];

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */

const maxDiffPixelRatio = 0.01;

function createProject(env: Env, region: Region, site: Site, size = "large") {
  const isDesktop = size === "large";
  const device = getDevice(isDesktop);
  return {
    expect: {
      timeout: Number(process.env.DEFAULT_EXPECT_TIMEOUT) * 1000,
      toHaveScreenshot: { maxDiffPixelRatio },
    },
    name: getProjectName(size === "large", env, region, site),
    use: {
      ...device,
    },
  };
}

function getProjectName(
  isDesktop: boolean,
  env: Env,
  region: Region,
  site: Site
): string {
  return isDesktop
    ? `${env}__${region}__${site}`
    : `MOBILE_${env}__${region}__${site}`;
}

const regions = Object.values(Region);
const desktopProjects = regions.map((region) =>
  createProject(Env.Prod, region, Site.Ploom)
);
const mobileProjects = regions.map((region) =>
  createProject(Env.Prod, region, Site.Ploom, "small")
);

function getDevice(isDesktop: boolean) {
  const device = isDesktop ? devices["Desktop Chrome"] : devices["Pixel 7"];

  return isDesktop
    ? { ...device, viewport: { width: 1920, height: 1080 } }
    : { ...device };
}

export const baseURL = () => {
  const config = getConfigFile().parsed as dotenv.DotenvParseOutput;
  return config["BASE_URL"];
};

function getConfigFile(): DotenvConfigOutput {
  return dotenv.config({
    path: `./config/${process.env.ENV_FILE}/${process.env.ENV_REGION}.env`,
  });
}
export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  /* Retry on CI only */
  retries: 1,
  testDir: "./tests",
  /* Run tests in files in parallel */
  timeout: Number(process.env.DEFAULT_TEST_TIMEOUT) * 1000,
  /* Opt out of parallel tests on CI. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    baseURL: baseUrl(),
    permissions: ["geolocation", "clipboard-read", "clipboard-write"],
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    // screenshot: 'on',
    video: "off",
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  workers: process.env.CI ? 3 : undefined,

  reporter: [
    ["html"],
    ["junit", { outputFile: "test-results/results.xml" }],
    ["json", { outputFile: `test-results/json/test-results.json` }],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: allureResultDir,
        environmentInfo: {
          Browser: process.env.SITE,
          Region: process.env.ENV_REGION,
          Environment: process.env.ENV_FILE,
        },
        suiteTitle: false,
      },
    ],
  ],

  projects: [...desktopProjects, ...mobileProjects],
});
