import { ReservationCrud } from "../../interface/reservationCrud.model";
import { Field } from "../../field.model";
import { User } from "../../user.model";
import { Reservation } from "../../reservation.model";



export class MockReservation implements ReservationCrud {

  protected container: Array<Reservation>
  protected id: number;

  constructor() {
    this.id = 1,
      this.container = new Array<Reservation>
  }


  getReservation(id: number): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const resultado = this.container.find((reservation: Reservation) => { return reservation.getId() === id })

      if (!resultado) {
        reject(new Error(`Reservation with id ${id} doesnt exist`))
      } else {
        resolve(resultado)
      }
    })
  }
  getReservations(): Promise<Array<Reservation>> {
    return new Promise<Array<Reservation>>((resolve) => {
      resolve(this.container)
    })
  }
  addReservation(reservation: Reservation): Promise<Reservation> {
    return new Promise<Reservation>((resolve) => {
      reservation.setId(this.id)
      this.container.push(reservation)
      this.id++
      resolve(reservation)
    })
  }
  editReservationField(id: number, field: Field): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find((reservation: Reservation) => reservation.getId() === id)

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${id} doesnt exist`))
      }
      else {
        ReservationToEdit.setField(field)
        resolve(ReservationToEdit)
      }
    })
  }
  editReservationUser(id: number, user: User): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find((reservation: Reservation) => reservation.getId() === id)

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${id} doesnt exist`))
      }
      else {
        ReservationToEdit.setUser(user)
        resolve(ReservationToEdit)
      }
    })
  }
  editReservationStart(id: number, start: Date): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find((reservation: Reservation) => reservation.getId() === id)

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${id} doesnt exist`))
      }
      else {
        ReservationToEdit.setStart(start)
        resolve(ReservationToEdit)
      }
    })
  }
  editReservationEnd(id: number, end: Date): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find((reservation: Reservation) => reservation.getId() === id)

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${id} doesnt exist`))
      }
      else {
        ReservationToEdit.setEnd(end)
        resolve(ReservationToEdit)
      }
    })
  }
  editReservationPaid(id: number, paid: boolean): Promise<Reservation> {
    return new Promise<Reservation>((resolve, reject) => {
      const ReservationToEdit = this.container.find((reservation: Reservation) => reservation.getId() === id)

      if (!ReservationToEdit) {
        reject(new Error(`Reservation with id ${id} doesnt exist`))
      }
      else {
        ReservationToEdit.setPaid(paid)
        resolve(ReservationToEdit)
      }
    })
  }
  deleteReservation(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.container.findIndex((reservation: Reservation) => reservation.getId() === id)

      if (index == -1) {
        reject(new Error(`Reservation with id ${id} doesnt exist`))
      }
      else {
        this.container.splice(index, 1)
      }
    })
  }
}

export default new MockReservation();
