import { UserCrud } from "../../interface/userCrud.model";
import { User } from "../../user.model";

export class MockUser implements UserCrud {
  protected container: Array<User>;
  protected id: number;
  constructor() {
    ((this.id = 1), (this.container = new Array<User>()));
  }

  getUser(id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserFound = this.container.find((user: User) => {
        return user.getId() === id;
      });

      if (!UserFound) {
        reject(new Error(`User with id ${id} doesnt exist`));
      } else {
        resolve(UserFound);
      }
    });
  }
  getUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>((resolve) => {
      resolve(this.container);
    });
  }

  addUser(data: {
    username: string;
    email: string;
    phonenumber: string;
  }): Promise<User> {
    return new Promise<User>((resolve) => {
      const newUser = new User(
        this.id,
        data.username,
        data.email,
        data.phonenumber
      );
      this.container.push(newUser);
      this.id++;
      resolve(newUser);
    });
  }
  editUserUsername(data: { id: number; username: string }): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserToEdit = this.container.find(
        (user: User) => user.getId() === data.id
      );

      if (!UserToEdit) {
        reject(new Error(`User with id ${data.id} doesnt exist`));
      } else {
        UserToEdit.setUsername(data.username);
        resolve(UserToEdit);
      }
    });
  }
  editUserEmail(data: { id: number; email: string }): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserToEdit = this.container.find(
        (user: User) => user.getId() === data.id
      );

      if (!UserToEdit) {
        reject(new Error(`User with id ${data.id} doesnt exist`));
      } else {
        UserToEdit.setEmail(data.email);
        resolve(UserToEdit);
      }
    });
  }
  editUserPhonenumber(data: {
    id: number;
    phonenumber: string;
  }): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserToEdit = this.container.find(
        (user: User) => user.getId() === data.id
      );

      if (!UserToEdit) {
        reject(new Error(`User with id ${data.id} doesnt exist`));
      } else {
        UserToEdit.setPhonenumber(data.phonenumber);
        resolve(UserToEdit);
      }
    });
  }
  deleteUser(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.container.findIndex(
        (user: User) => user.getId() === id
      );

      if (index == -1) {
        reject(new Error(`User with id ${id} doesnt exist`));
      } else {
        this.container.splice(index, 1);
        resolve();
      }
    });
  }
}

export default new MockUser();
