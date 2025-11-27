import { Field } from "../field.model";
import { Reservation } from "../reservation.model";
import { User } from "../user.model";

export interface ReservationCrud {
  getReservation(id: number): Promise<Reservation>;
  getReservations(): Promise<Array<Reservation>>;
  addReservation(reservation: Reservation): Promise<Reservation>;
  editReservationUser(data: { id: number; user: User }): Promise<Reservation>;
  editReservationField(data: {
    id: number;
    field: Field;
  }): Promise<Reservation>;
  editReservationStart(data: { id: number; start: Date }): Promise<Reservation>;
  editReservationEnd(data: { id: number; end: Date }): Promise<Reservation>;
  editReservationPaid(data: {
    id: number;
    paid: boolean;
  }): Promise<Reservation>;
  deleteReservation(id: number): Promise<void>;
}
