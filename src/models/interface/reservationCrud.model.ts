

import { Field } from "../mock/field/field.model";
import { Reservation } from "../mock/reservation/reservation.model";
import { User } from "../mock/user/user.model";

export interface ReservationCrud {
  getReservation(id: number): Reservation;
  getReservations(): Array<Reservation>;
  addReservation(reservation: Reservation): Reservation;
  editReservationUser(id: number, user: User): Reservation;
  editReservationField(id: number, field: Field): Reservation;
  editReservationStart(id: number, start: Date): Reservation;
  editReservationEnd(id: number, end: Date): Reservation;
  editReservationPaid(id: number, paid: boolean): Reservation;
  deleteReservation(id: number): string;
}
