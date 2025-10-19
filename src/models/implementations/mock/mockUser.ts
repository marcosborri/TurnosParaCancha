import { UserCrud } from "../../interface/userCrud.model";
import { User } from "../../user.model";

export class MockUser implements UserCrud {
  getUser(id: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUsers(): Promise<Array<User>> {
    throw new Error("Method not implemented.");
  }
  addUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  editUserUsername(id: number, username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  editUserEmail(id: number, email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  editUserPhonenumber(id: number, phonenumber: number): Promise<User> {
    throw new Error("Method not implemented.");
  }
  deleteUser(id: number): string {
    throw new Error("Method not implemented.");
  }

}


export default new MockUser();
