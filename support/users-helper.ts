import { User } from "../data-types/models/user";

export function createUserInstance(accountData: {email: string}) {
    return new User(accountData.email);
  }