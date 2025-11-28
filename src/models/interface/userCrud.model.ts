import { User } from "../user.model";

export interface UserCrud {
  getUser(id: number): Promise<User>;
  getUsers(): Promise<Array<User>>;
  addUser(data: {
    username: string;
    email: string;
    phonenumber: string;
  }): Promise<User>;
  editUserUsername(data: { id: number; username: string }): Promise<User>;
  editUserEmail(data: { id: number; email: string }): Promise<User>;
  editUserPhonenumber(data: { id: number; phonenumber: string }): Promise<User>;
  deleteUser(id: number): Promise<void>;
}

