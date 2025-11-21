import { User } from "../models/user.model";
import userRepo from "../models/implementations/mock/mockUser";
import reservationRepo from "../models/implementations/mock/mockReservation";
import { UserCrud } from "../models/interface/userCrud.model";
import { reservationSubject } from "../models/observer/reservation.interface";

export class UserService implements UserCrud {
  async getUsers(): Promise<User[]> {
    return userRepo.getUsers();
  }

  async getUser(id: number): Promise<User> {
    return userRepo.getUser(id);
  }

  async addUser(data: {
    username: string;
    email: string;
    phonenumber: string;
  }): Promise<User> {
    return userRepo.addUser(data);
  }

  async editUserUsername(data: {
    id: number;
    username: string;
  }): Promise<User> {
    return userRepo.editUserUsername(data);
  }

  async editUserEmail(data: { id: number; email: string }): Promise<User> {
    return userRepo.editUserEmail(data);
  }

  async editUserPhonenumber(data: {
    id: number;
    phonenumber: string;
  }): Promise<User> {
    return userRepo.editUserPhonenumber(data);
  }

  async deleteUser(id: number): Promise<void> {
    const reservations = await reservationRepo.getReservations();
    const subject = reservationSubject;

    const toDelete = reservations.filter((r) => r.getUser().getId() === id);

    // Borrar reservas y notificar
    for (const reservation of toDelete) {
      await reservationRepo.deleteReservation(reservation.getId());
      subject.notify(`La reserva ${reservation.getId()} se liberó`);
    }

    // Ahora sí borrar usuario
    await userRepo.deleteUser(id);
  }
}

export default new UserService();
