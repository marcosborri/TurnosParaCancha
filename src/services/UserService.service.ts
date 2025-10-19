import { User } from "../models/mock/user/user.model";
import userRepo from "../models/mock/user/mockUser";
export class UserService {
  //Obtener todos los usuarios
  async getUsers(): Promise<User[]> {
    return userRepo.getUsers();
  }

  //Obtener usuario por ID
  async getUser(id: number): Promise<User> {
    if (!id) {
      throw new Error("El ID no es correcto");
    }

    try {
      const user = await userRepo.getUser(id);
      return user;
    } catch (error) {
      throw new Error(`No hay usuario con ese ID ${error}`);
    }
  }
  //Agregar usuario
  async addUser(data: {
    username: string;
    email: string;
    phonenumber: number;
  }): Promise<User> {
    try {
      const newUser = new User(0, data.username, data.email, data.phonenumber);
      return await userRepo.addUser(newUser);
    } catch (error) {
      throw new Error(`Error al crear usuario nuevo ${error}`);
    }
  }

  //Editar nombre del usuario
  async usernameEdit(data: { id: number; username: string }): Promise<User> {
    try {
      const usernameToEdit = await userRepo.getUser(data.id);
      if (!usernameToEdit) {
        throw new Error("Usuario no se encuentra");
      }

      usernameToEdit.setUsername(data.username);
      return usernameToEdit;
    } catch (error) {
      throw new Error(`Error al editar el nombre de usuario ${error}`);
    }
  }
  //Editar email del usuario
  async emailEdit(data: { id: number; email: string }): Promise<User> {
    try {
      const emailToEdit = await userRepo.getUser(data.id);
      if (!emailToEdit) {
        throw new Error("Usuario no se encuentra");
      }

      emailToEdit.setEmail(data.email);
      return emailToEdit;
    } catch (error) {
      throw new Error(`Error al editar el email del usuario ${error}`);
    }
  }
  //Editar celular del usuario
  async phonenumberToEdit(data: {
    id: number;
    phonenumber: number;
  }): Promise<User> {
    try {
      const phonenumberToEdit = await userRepo.getUser(data.id);
      if (!phonenumberToEdit) {
        throw new Error("Usuario no se encuentra");
      }

      phonenumberToEdit.setPhonenumber(data.phonenumber);
      return phonenumberToEdit;
    } catch (error) {
      throw new Error(
        `Error al editar el numero de telefono del usuario ${error}`
      );
    }
  }
  //Eliminar usuario
  async deleteUser(id: number): Promise<User> {
    if (!id) {
      throw new Error("No hay ID para eliminar usuario");
    }
    try {
      const userToDelete = await userRepo.getUser(id);
      if (!userToDelete) {
        throw new Error("Usuario no se encuentra");
      }
      await userRepo.deleteUser(userToDelete.getId());
      return userToDelete;
    } catch (error) {
      throw new Error(`Error al eliminar usuario ${error}`);
    }
  }
}

export default new UserService();
