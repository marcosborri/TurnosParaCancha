import { describe, it, expect, beforeAll } from "vitest";
import UserService from "../../services/UserService.service";
import userRepo from "../../models/implementations/mock/mockUser";
import { User } from "../../models/user.model";

let user1: User;
let user2: User;

beforeAll(async () => {
  user1 = new User(1, "Juan", "juan@test.com", 291000002);
  user2 = new User(2, "Maria", "maria@test.com", 291000001);

  await userRepo.addUser(user1)
});

describe('Reglas de servicio - UserService', ()=>{

    it("Debe arrojar error si el ID no es válido", async () => {
        await expect(UserService.getUser(0)).rejects.toThrow("El ID no es correcto");
    });

    it("Debe arrojar error si el usuario no existe", async () => {
        await expect(UserService.getUser(999)).rejects.toThrow("No hay usuario con ese ID");
    });

    it("Debe agregar un nuevo usuario", async () => {
        const newUserData = { username: "Carlos", email: "carlos@test.com", phonenumber: 291912018,};

        const newUser = await UserService.addUser(newUserData);
        const users = await userRepo.getUsers();

        expect(newUser.getUsername()).toBe("Carlos");
        expect(users.length).toBe(2);
    });

    it("Debe arrojar error si el ID es inválido al eliminar", async () => {
        await expect(UserService.deleteUser(0)).rejects.toThrow("No hay ID para eliminar usuario");
    });

    it("Debe arrojar error si el usuario no existe al eliminar", async () => {
        await expect(UserService.deleteUser(999)).rejects.toThrow("Error al eliminar usuario Error: User with id 999 doesnt exist");
    });
});