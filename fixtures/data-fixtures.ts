import { test as base } from "playwright/test";

import type { User } from "../data-types/models/user";
import { readUsersData } from "../support/file-helper";
import { createUserInstance } from "../support/users-helper";

export interface Data {
  users: any;
  mainUser: User;
  invalidEmailUser: User;
}

export const test = base.extend<Data>({
  users: async ({}, use) => {
    const users = await readUsersData();

    await use(users);
  },

  mainUser: async ({ users }, use) => {
    await use(createUserInstance(users.mainAccount));
  },

  invalidEmailUser: async ({ users }, use) => {
    await use(createUserInstance(users.mainAccount));
  },
});
