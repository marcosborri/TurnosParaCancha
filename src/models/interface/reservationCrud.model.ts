
import { Field } from "../field.model";
import { Reservation } from "../reservation.model";
import { User } from "../user.model";

export interface ReservationCrud {
  getReservation(id: number): Promise<Reservation>;
  getReservations(): Promise<Array<Reservation>>;
  addReservation(reservation: Reservation): Promise<Reservation>;
  editReservationUser(id: number, user: User): Promise<Reservation>;
  editReservationField(id: number, field: Field): Promise<Reservation>;
  editReservationStart(id: number, start: Date): Promise<Reservation>;
  editReservationEnd(id: number, end: Date): Promise<Reservation>;
  editReservationPaid(id: number, paid: boolean): Promise<Reservation>;
  deleteReservation(id: number): string;
}
