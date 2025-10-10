import { UserCrud } from "./interface/userCrud.model";
import { User } from "./user.model";

export class MockUser implements UserCrud {
  getUser(id: number): User {
    throw new Error("Method not implemented.");
  }
  getUsers(): Array<User> {
    throw new Error("Method not implemented.");
  }
  addUser(user: User): User {
    throw new Error("Method not implemented.");
  }
  editUserUsername(id: number, username: string): User {
    throw new Error("Method not implemented.");
  }
  editUserEmail(id: number, email: string): User {
    throw new Error("Method not implemented.");
  }
  editUserPhonenumber(id: number, phonenumber: number): User {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: number): string {
    throw new Error("Method not implemented.");
  }
}
