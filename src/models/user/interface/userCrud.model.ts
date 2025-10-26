import { User } from '../user.model';

export interface UserCrud {
  getUser(id: number): User;
  getUsers(): Array<User>;
  addUser(user: User): User;
  editUserUsername(id: number, username: string): User;
  editUserEmail(id: number, email: string): User;
  editUserPhonenumber(id: number, phonenumber: number): User;
  deleteUser(id: number): string;
}
