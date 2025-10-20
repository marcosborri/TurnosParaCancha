import { User } from "../user.model";


export interface UserCrud {
  getUser(id: number): Promise<User>;
  getUsers(): Promise<Array<User>>;
  addUser(user: User): Promise<User>;
  editUserUsername(id: number, username: string): Promise<User>;
  editUserEmail(id: number, email: string): Promise<User>;
  editUserPhonenumber(id: number, phonenumber: number): Promise<User>;
  deleteUser(id: number): Promise<void>;
}
