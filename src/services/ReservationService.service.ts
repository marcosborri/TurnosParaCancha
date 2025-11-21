import { Reservation } from "../models/reservation.model";
import reservationRepo from "../models/implementations/mock/mockReservation";
import { Field } from "../models/field.model";
import { User } from "../models/user.model";

export class ReservationService {
  //Obtener todas las reservas
  async getReservations(): Promise<Reservation[]> {
    return reservationRepo.getReservations();
  }

  //Obtener reserva por ID
  async getReservation(id: number): Promise<Reservation> {
    if (!id || id <= 0) {
      throw new Error("ID no valido");
    }
    try {
      const getReservationById = await reservationRepo.getReservation(id);

      if (!getReservationById) {
        throw new Error("Reserva con ese ID no existe");
      }

      return getReservationById;
    } catch (error) {
      throw new Error(`Error de ID para la reserva ${error}`);
    }
  }

  //Agregar una reserva nueva
  async addReservation(reservation: Reservation): Promise<Reservation> {
    return reservationRepo.addReservation(reservation);
  }

  async editReservationField(data: {
    id: number;
    field: Field;
  }): Promise<Reservation> {
    try {
      const fieldToEdit = await reservationRepo.getReservation(data.id);
      if (!fieldToEdit) {
        throw new Error("Cancha no se puede editar");
      }

      fieldToEdit.setField(data.field);
      await reservationRepo.editReservationField(data);
      return fieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar la cancha de la reserva ${error}`);
    }
  }

  async editReservationUser(data: {
    id: number;
    user: User;
  }): Promise<Reservation> {
    try {
      const userToEdit = await reservationRepo.getReservation(data.id);
      if (!userToEdit) {
        throw new Error("Usuario no se puede editar");
      }

      userToEdit.setUser(data.user);
      await reservationRepo.editReservationUser(data);
      return userToEdit;
    } catch (error) {
      throw new Error(`Error al editar usuario de la reserva ${error}`);
    }
  }

  async editReservationStart(data: {
    id: number;
    start: Date;
  }): Promise<Reservation> {
    try {
      const startEdit = await reservationRepo.getReservation(data.id);
      if (!startEdit) {
        throw new Error("Inicio de la reserva no se puede editar");
      }

      startEdit.setStart(data.start);
      await reservationRepo.editReservationStart(data);
      return startEdit;
    } catch (error) {
      throw new Error(`Error al editar el inicio de la reserva ${error}`);
    }
  }

  async editReservationEnd(data: {
    id: number;
    end: Date;
  }): Promise<Reservation> {
    try {
      const endEdit = await reservationRepo.getReservation(data.id);
      if (!endEdit) {
        throw new Error("Finalizacion de la reserva no se puede editar");
      }

      endEdit.setEnd(data.end);
      await reservationRepo.editReservationEnd(data);
      return endEdit;
    } catch (error) {
      throw new Error(`Error al editar la finalizacion de la reserva ${error}`);
    }
  }

  async editReservationPaid(data: {
    id: number;
    paid: boolean;
  }): Promise<Reservation> {
    try {
      const paidEdit = await reservationRepo.getReservation(data.id);
      if (!paidEdit) {
        throw new Error("Estado de pago no se puede editar");
      }

      paidEdit.setPaid(data.paid);
      await reservationRepo.editReservationPaid(data);
      return paidEdit;
    } catch (error) {
      throw new Error(`Error al editar el estado de pago ${error}`);
    }
  }

  async deleteReservation(id: number): Promise<Reservation> {
    if (!id || id <= 0) {
      throw new Error("No hay ID para eliminar reserva");
    }
    try {
      const reservationToDelete = await reservationRepo.getReservation(id);
      if (!reservationToDelete) {
        throw new Error("Reserva no existente");
      }

      await reservationRepo.deleteReservation(reservationToDelete.getId());
      return reservationToDelete;
    } catch (error) {
      throw new Error(`Error al eliminar la reserva ${error}`);
    }
  }
}

export default new ReservationService();
