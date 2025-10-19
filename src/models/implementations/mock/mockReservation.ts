import { ReservationCrud } from "../../interface/reservationCrud.model";
import { Field } from "../../field.model";
import { User } from "../../user.model";
import { Reservation } from "../../reservation.model";



export class MockReservation implements ReservationCrud {
  editReservationField(id: number, field: Field): Promise<Reservation> {
    throw new Error("Method not implemented.");
  }
  getReservation(id: number): Promise<Reservation> {
    throw new Error("Method not implemented.");
  }
  getReservations(): Promise<Array<Reservation>> {
    throw new Error("Method not implemented.");
  }
  addReservation(reservation: Reservation): Promise<Reservation> {
    throw new Error("Method not implemented.");
  }
  editReservationUser(id: number, user: User): Promise<Reservation> {
    throw new Error("Method not implemented.");
  }
  editReservationStart(id: number, start: Date): Promise<Reservation> {
    throw new Error("Method not implemented.");
  }
  editReservationEnd(id: number, end: Date): Promise<Reservation> {
    throw new Error("Method not implemented.");
  }
  editReservationPaid(id: number, paid: boolean): Promise<Reservation> {
    throw new Error("Method not implemented.");
  }
  deleteReservation(id: number): string {
    throw new Error("Method not implemented.");
  }
}

export default new MockReservation();
