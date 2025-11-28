import { Request, Response } from "express";
import UserService from "../services/UserService.service";

export class UserController {
  //Llamar a todos los usuarios
  async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await UserService.getUsers();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  //Llamar a usuario por ID
  async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Problemas con el ID, no se encuentra" });
    }

    try {
      const getUser = await UserService.getUser(Number(id));
      return res.status(200).json(getUser);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message});
      }
    }
  }

  //Crear un usuario nuevo
  async addNewUser(req: Request, res: Response) {
    const { username, email, phonenumber } = req.body;

    if (!username || !email || !phonenumber) {
      return res
        .status(400)
        .json({ error: "Faltan datos para crear un usuario" });
    }
    try {
      const newUser = await UserService.addUser({
        username,
        email,
        phonenumber,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  //Eliminar un usuario
  async eliminateUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Problemas con el ID, no se encuentra" });
    }

    try {
      const userDeleted = await UserService.deleteUser(Number(id));
      return res.status(200).json(userDeleted);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  //Editar campos
  async usernameUserEdit(req: Request, res: Response) {
    const id = req.params.id;
    const username = req.body.username;
    if (!id || !username) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const usernameEdited = await UserService.editUserUsername({
        id: Number(id),
        username,
      });
      return res.status(200).json(usernameEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async emailUserEdit(req: Request, res: Response) {
    const id = req.params.id;
    const email = req.body.email;
    if (!id || !email) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const emailEdited = await UserService.editUserEmail({
        id: Number(id),
        email,
      });
      return res.status(200).json(emailEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async phonenumberUserEdit(req: Request, res: Response) {
    const id = req.params.id;
    const phonenumber = req.body.phonenumber;
    if (!id || !phonenumber) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const phonenumberEdited = await UserService.editUserPhonenumber({
        id: Number(id),
        phonenumber,
      });
      return res.status(200).json(phonenumberEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}

export default new UserController();
