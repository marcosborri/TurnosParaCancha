import { UserCrud } from "../../interface/userCrud.model";
import { User } from "../../user.model";
import { saveData, loadData } from '../../../utils/jsonFunctions.utils'

export class MockUser implements UserCrud {
  protected filePath: string = 'src/database/users.json'
  constructor() {}

  getUser(id: number): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const data = await loadData(this.filePath)
      const UserFound = data.find((user: any) => {
        return user.id === id;
      });

      if (!UserFound) {
        reject(new Error(`User with id ${id} doesnt exist`));
      } else {
        resolve(UserFound);
      }
    });
  }
  getUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>(async (resolve) => {
      const data = await loadData(this.filePath)
      resolve(data);
    });
  }

  addUser(data: {username: string; email: string; phonenumber: string;}): Promise<User> {
    return new Promise<User>(async (resolve) => {
      const dataJson = await loadData(this.filePath)
      let id = dataJson.length + 1
      const newUser = new User(id, data.username, data.email, data.phonenumber);

      while (dataJson.find((u: any) => u.id === id)) {
        id++
      }

      newUser.setId(id++);
      dataJson.push(newUser);
      saveData(dataJson, this.filePath)
      resolve(newUser);
    });
  }
  editUserUsername(data: { id: number; username: string }): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const dataJson = await loadData(this.filePath)
      const UserToEdit = dataJson.find(
        (user: any) => user.id === data.id
      );

      if (!UserToEdit) {
        reject(new Error(`User with id ${data.id} doesnt exist`));
      } else {
        UserToEdit.username = data.username;
        saveData(dataJson, this.filePath)
        resolve(UserToEdit);
      }
    });
  }
  editUserEmail(data: { id: number; email: string }): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const dataJson = await loadData(this.filePath)
      const UserToEdit = dataJson.find(
        (user: any) => user.id === data.id
      );

      if (!UserToEdit) {
        reject(new Error(`User with id ${data.id} doesnt exist`));
      } else {
        UserToEdit.email = data.email;
        saveData(dataJson, this.filePath)
        resolve(UserToEdit);
      }
    });
  }
  editUserPhonenumber(data: {
    id: number;
    phonenumber: string;
  }): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {
      const dataJson = await loadData(this.filePath)
      const UserToEdit = dataJson.find(
        (user: any) => user.id === data.id
      );

      if (!UserToEdit) {
        reject(new Error(`User with id ${data.id} doesnt exist`));
      } else {
        UserToEdit.phonenumber = data.phonenumber;
        saveData(dataJson, this.filePath)
        resolve(UserToEdit);
      }
    });
  }
  deleteUser(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const dataJson = await loadData(this.filePath)
      const index = dataJson.findIndex(
        (user: any) => user.id === id
      );

      if (index == -1) {
        reject(new Error(`User with id ${id} doesnt exist`));
      } else {
        dataJson.splice(index, 1);
        saveData(dataJson, this.filePath)
        resolve();
      }
    });
  }
}

export default new MockUser();
