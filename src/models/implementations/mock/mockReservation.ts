import { ReservationCrud } from "../../interface/reservationCrud.model";
import { Field } from "../../field.model";
import { User } from "../../user.model";
import { Reservation } from "../../reservation.model";

export class MockReservation implements ReservationCrud {
  protected container: Array<Reservation>;
  protected id: number;

  constructor() {
    ((this.id = 1), (this.container = new Array<Reservation>()));
  }

  getReservation(id: number): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const resultado = this.container.find((reservation: Reservation) => {
        return reservation.getId() === id;
      });

      if (!resultado) {
        reject(new Error(`Reservation with id ${id} doesnt exist`));
      } else {
        resolve(resultado);
      }
    });
  }
  getReservations(): Promise<Array<Reservation>> {
    return new Promise<Array<Reservation>>((resolve) => {
      resolve(this.container);
    });
  }
  addReservation(reservation: Reservation): Promise<Reservation> {
    return new Promise<Reservation>((resolve) => {
      reservation.setId(this.id);
      this.container.push(reservation);
      this.id++;
      resolve(reservation);
    });
  }
  editReservationField(data: {
    id: number;
    field: Field;
  }): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find(
        (reservation: Reservation) => reservation.getId() === data.id
      );

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${data.id} doesnt exist`));
      } else {
        ReservationToEdit.setField(data.field);
        resolve(ReservationToEdit);
      }
    });
  }
  editReservationUser(data: { id: number; user: User }): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find(
        (reservation: Reservation) => reservation.getId() === data.id
      );

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${data.id} doesnt exist`));
      } else {
        ReservationToEdit.setUser(data.user);
        resolve(ReservationToEdit);
      }
    });
  }
  editReservationStart(data: {
    id: number;
    start: Date;
  }): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find(
        (reservation: Reservation) => reservation.getId() === data.id
      );

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${data.id} doesnt exist`));
      } else {
        ReservationToEdit.setStart(data.start);
        resolve(ReservationToEdit);
      }
    });
  }
  editReservationEnd(data: { id: number; end: Date }): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find(
        (reservation: Reservation) => reservation.getId() === data.id
      );

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${data.id} doesnt exist`));
      } else {
        ReservationToEdit.setEnd(data.end);
        resolve(ReservationToEdit);
      }
    });
  }
  editReservationPaid(data: {
    id: number;
    paid: boolean;
  }): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find(
        (reservation: Reservation) => reservation.getId() === data.id
      );

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${data.id} doesnt exist`));
      } else {
        ReservationToEdit.setPaid(data.paid);
        resolve(ReservationToEdit);
      }
    });
  }
  deleteReservation(id: number): Promise<Reservation> {
    return new Promise((resolve, reject) => {
      const index = this.container.findIndex(
        (reservation: Reservation) => reservation.getId() === id
      );

      if (index == -1) {
        reject(new Error(`Reservation with id ${id} doesnt exist`));
      } else {
        const deleted = this.container[index] as Reservation;
        this.container.splice(index, 1);
        resolve(deleted);
      }
    });
  }
}

export default new MockReservation();
