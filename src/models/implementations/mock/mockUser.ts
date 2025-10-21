import { UserCrud } from "../../interface/userCrud.model";
import { User } from "../../user.model";

export class MockUser implements UserCrud {

  protected container: Array<User>
  protected id: number
  constructor() {
    this.id = 1,
    this.container = new Array<User>()
    
  }


  getUser(id: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserFound = this.container.find((user: User) => { return user.getId() === id })

      if (!UserFound) {
        reject(new Error(`User with id ${id} doesnt exist`))
      } else {
        resolve(UserFound)
      }
    })

  }
  getUsers(): Promise<Array<User>> {
    return new Promise<Array<User>>((resolve) => {
      resolve(this.container)
    })
  }

  addUser(user: User): Promise<User> {
    return new Promise<User>((resolve) => {
      user.setId(this.id)
      this.container.push(user)
      this.id++
      resolve(user)
    })
  }
  editUserUsername(id: number, username: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserToEdit = this.container.find((user: User) => user.getId() === id)

      if (!UserToEdit) {
        reject(new Error(`User with id ${id} doesnt exist`))
      }
      else {
        UserToEdit.setUsername(username)
        resolve(UserToEdit)
      }
    })
  }
  editUserEmail(id: number, email: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserToEdit = this.container.find((user: User) => user.getId() === id)

      if (!UserToEdit) {
        reject(new Error(`User with id ${id} doesnt exist`))
      }
      else {
        UserToEdit.setEmail(email)
        resolve(UserToEdit)
      }
    })
  }
  editUserPhonenumber(id: number, phonenumber: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const UserToEdit = this.container.find((user: User) => user.getId() === id)

      if (!UserToEdit) {
        reject(new Error(`User with id ${id} doesnt exist`))
      }
      else {
        UserToEdit.setPhonenumber(phonenumber)
        resolve(UserToEdit)
      }
    })
  }
  deleteUser(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.container.findIndex((user: User) => user.getId() === id)

      if (index == -1) {
        reject(new Error(`User with id ${id} doesnt exist`))
      }
      else {
        this.container.splice(index, 1)
      }
    })
  }

}


export default new MockUser();
