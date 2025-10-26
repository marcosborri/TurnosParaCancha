import { Reservation } from './reservation.model';
import { ReservationCrud } from './interface/reservationCrud.model';
import { User } from '../user/user.model';
import { Field } from '../field/field.model';

export class MockReservation implements ReservationCrud {
  editReservationField(id: number, field: Field): Reservation {
    throw new Error('Method not implemented.');
  }
  getReservation(id: number): Reservation {
    throw new Error('Method not implemented.');
  }
  getReservations(): Array<Reservation> {
    throw new Error('Method not implemented.');
  }
  addReservation(reservation: Reservation): Reservation {
    throw new Error('Method not implemented.');
  }
  editReservationUser(id: number, user: User): Reservation {
    throw new Error('Method not implemented.');
  }
  editReservationStart(id: number, start: Date): Reservation {
    throw new Error('Method not implemented.');
  }
  editReservationEnd(id: number, end: Date): Reservation {
    throw new Error('Method not implemented.');
  }
  editReservationPaid(id: number, paid: boolean): Reservation {
    throw new Error('Method not implemented.');
  }
  deleteReservation(id: number): string {
    throw new Error('Method not implemented.');
  }
}

export default new MockReservation();
