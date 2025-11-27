import { ReservationCrud } from '../../interface/reservationCrud.model'
import { Field } from '../../field.model'
import { User } from '../../user.model'
import { Reservation } from '../../reservation.model'
import { saveData, loadData } from '../../../utils/jsonFunctions.utils'
import { FieldFactory } from '../../../factories/field.factory'

export class MockReservation implements ReservationCrud {
    protected reservationFilePath: string = 'src/database/reservation.json'

    constructor() {}

    getReservation(id: number): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve, reject) => {
            const data = await loadData(this.reservationFilePath)
            const resultado = data.find((reservation: any) => {
                return reservation.id === id
            })

            if (!resultado) {
                reject(new Error(`Reservation with id ${id} doesnt exist`))
            } else {
                resolve(resultado)
            }
        })
    }
    getReservations(): Promise<Array<Reservation>> {
        return new Promise(async (resolve) => {
            const data = await loadData(this.reservationFilePath)

            const reconstructed = data.map((r: any) => {
                const field = FieldFactory.create(
                    r.field.name,
                    r.field.typeField
                )
                field.setId(r.field.id)
                field.setPrice(r.field.price)

                const user = new User(
                    r.user.id,
                    r.user.username,
                    r.user.email,
                    r.user.phonenumber
                )

                return new Reservation(
                    r.id,
                    user,
                    field,
                    new Date(r.start),
                    new Date(r.end),
                    r.paid
                )
            })

            resolve(reconstructed)
        })
    }
    addReservation(reservation: Reservation): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve) => {
            const data = await loadData(this.reservationFilePath)
            let id = data.length + 1
            while (data.find((r: any) => r.id === id)) {
                id++
            }
            reservation.setId(id)
            data.push(reservation)
            saveData(data, this.reservationFilePath)
            resolve(reservation)
        })
    }
    editReservationField(data: {
        id: number
        field: Field
    }): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve, reject) => {
            const dataJson = await loadData(this.reservationFilePath)
            const ReservationToEdit = dataJson.find(
                (r: any) => r.id === data.id
            )

            if (!ReservationToEdit) {
                reject(new Error(`Reservation with id ${data.id} doesnt exist`))
            } else {
                ReservationToEdit.field = data.field
                saveData(dataJson, this.reservationFilePath)
                resolve(ReservationToEdit)
            }
        })
    }
    editReservationUser(data: {
        id: number
        user: User
    }): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve, reject) => {
            const dataJson = await loadData(this.reservationFilePath)
            const ReservationToEdit = dataJson.find(
                (r: any) => r.id === data.id
            )

            if (!ReservationToEdit) {
                reject(new Error(`Reservation with id ${data.id} doesnt exist`))
            } else {
                ReservationToEdit.user = data.user
                saveData(dataJson, this.reservationFilePath)
                resolve(ReservationToEdit)
            }
        })
    }
    editReservationStart(data: {
        id: number
        start: Date
    }): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve, reject) => {
            const dataJson = await loadData(this.reservationFilePath)
            const ReservationToEdit = dataJson.find(
                (r: any) => r.id === data.id
            )

            if (!ReservationToEdit) {
                reject(new Error(`Reservation with id ${data.id} doesnt exist`))
            } else {
                ReservationToEdit.start = data.start
                saveData(dataJson, this.reservationFilePath)
                resolve(ReservationToEdit)
            }
        })
    }
    editReservationEnd(data: { id: number; end: Date }): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve, reject) => {
            const dataJson = await loadData(this.reservationFilePath)
            const ReservationToEdit = dataJson.find(
                (r: any) => r.id === data.id
            )

            if (!ReservationToEdit) {
                reject(new Error(`Reservation with id ${data.id} doesnt exist`))
            } else {
                ReservationToEdit.end = data.end
                saveData(dataJson, this.reservationFilePath)
                resolve(ReservationToEdit)
            }
        })
    }
    editReservationPaid(data: {
        id: number
        paid: boolean
    }): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve, reject) => {
            const dataJson = await loadData(this.reservationFilePath)
            const ReservationToEdit = dataJson.find(
                (r: any) => r.id === data.id
            )

            if (!ReservationToEdit) {
                reject(new Error(`Reservation with id ${data.id} doesnt exist`))
            } else {
                ReservationToEdit.paid = data.paid
                saveData(dataJson, this.reservationFilePath)
                resolve(ReservationToEdit)
            }
        })
    }
    deleteReservation(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const dataJson = await loadData(this.reservationFilePath)
            const index = dataJson.findIndex((r: any) => r.id === id)

            if (index == -1) {
                reject(new Error(`Reservation with id ${id} doesnt exist`))
            } else {
                dataJson.splice(index, 1)
                saveData(dataJson, this.reservationFilePath)
                resolve()
            }
        })
    }
}

export default new MockReservation()
