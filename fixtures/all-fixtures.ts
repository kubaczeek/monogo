import { mergeTests } from "playwright/test";

import { test as dataFixtures } from "./data-fixtures";
import { test as stateFixtures } from "./state-fixtures";

export const mergeTest = mergeTests(dataFixtures, stateFixtures);

export function stepWithParam(
  target: Function,
  context: ClassMethodDecoratorContext
) {
  return function replacementMethod(...args: any) {
    let name = "";

    if (args) {
      name += " args: " + args.join(" ");
    }
    name += " Stack: " + this.constructor.name + "." + (context.name as string);

    return test.step(name, async () => {
      return await target.call(this, ...args);
    });
  };
}

export function customStep(customStep: string, notHandled?: never) {
  function stepWithParam(
    target: Function,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(...args: any) {
      let name = customStep;

      if (args) {
        name += " args: " + args.join(" ");
      }
      name +=
        " Stack: " + this.constructor.name + "." + (context.name as string);

      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  }

  return stepWithParam;
}

export const test = mergeTest.extend<{ testHook: void; setEnv: void }>({
  setEnv: [setEnvFiles, { auto: true }],
});

async function setEnvFiles({}, use, config) {
  const projectName = config.project.name;

  const envs = projectName.replace("MOBILE_", "").split("__");
  process.env.PROJECT_NAME = projectName;
  process.env.ENV_FILE = envs[0];
  process.env.ENV_REGION = envs[1];
  process.env.ENV_SITE = envs[2];

  await use();
}

export { expect } from "playwright/test";
