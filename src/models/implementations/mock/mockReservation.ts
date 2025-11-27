import { ReservationCrud } from '../../interface/reservationCrud.model'
import { Field } from '../../field.model'
import { User } from '../../user.model'
import { Reservation } from '../../reservation.model'
import { saveData, loadData } from '../../../utils/jsonFunctions.utils'
import { FieldFactory } from '../../../factories/field.factory'

export class MockReservation implements ReservationCrud {
    protected reservationFilePath: string = 'src/database/reservation.json'

    constructor() {}

    async getReservation(id: number): Promise<Reservation> {
        return new Promise<Reservation>(async (resolve, reject) => {
            const data = await loadData(this.reservationFilePath)
            const r = data.find((reservation: any) => reservation.id === id)

            if (!r) {
                reject(new Error(`Reservation with id ${id} doesnt exist`))
            } else {
                // si r.field es un número, buscar el objeto de fields.json
                let fieldSource: any = r.field
                if (typeof r.field === 'number') {
                    const allFields = await loadData('src/database/fields.json')
                    const found = (allFields || []).find((f: any) => Number(f.id) === Number(r.field))
                    fieldSource = found ?? { id: r.field, name: `Field ${r.field}`, typeField: 'F5', price: 0 }
                }

                const field = FieldFactory.create(
                    fieldSource.name,
                    fieldSource.typeField ?? 'F5'
                )
                field.setId(fieldSource.id)
                field.setPrice(fieldSource.price ?? 0)

                const user = new User(
                    r.user.id,
                    r.user.username,
                    r.user.email,
                    r.user.phonenumber
                )

                const reservation = new Reservation(
                    r.id,
                    user,
                    field,
                    new Date(r.start),
                    new Date(r.end),
                    r.paid
                )

                resolve(reservation)
            }
        })
    }

    async getReservations(): Promise<Array<Reservation>> {
        return new Promise(async (resolve) => {
            const data = await loadData(this.reservationFilePath)

            const reconstructed = await Promise.all(data.map(async (r: any) => {
                // manejar cuando r.field es número
                let fieldSource: any = r.field
                if (typeof r.field === 'number') {
                    const allFields = await loadData('src/database/fields.json')
                    const found = (allFields || []).find((f: any) => Number(f.id) === Number(r.field))
                    fieldSource = found ?? { id: r.field, name: `Field ${r.field}`, typeField: 'F5', price: 0 }
                }

                const field = FieldFactory.create(
                    fieldSource.name,
                    fieldSource.typeField ?? 'F5'
                )
                field.setId(fieldSource.id)
                field.setPrice(fieldSource.price ?? 0)

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
            }))

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
            try {
                const all = await loadData(this.reservationFilePath)
                const idx = all.findIndex((r: any) => Number(r.id) === Number(data.id))
                if (idx === -1) return reject(new Error(`Reserva ${data.id} no encontrada`))

                // Normalizar user a POJO
                const u: any = data.user
                const plainUser = {
                    id: typeof u.getId === "function" ? u.getId() : u.id ?? u._id,
                    username: u.username,
                    email: u.email,
                    phonenumber: u.phonenumber,
                }

                // Guardar en el JSON
                all[idx].user = plainUser
                await saveData(all, this.reservationFilePath)

                // Reconstruir reservation como instancia (igual que getReservation)
                const r = all[idx]

                // Resolver field (si en JSON está como número, buscar en fields.json)
                let fieldSource: any = r.field
                if (typeof r.field === "number") {
                    const allFields = await loadData("src/database/fields.json")
                    const found = (allFields || []).find((f: any) => Number(f.id) === Number(r.field))
                    fieldSource = found ?? { id: r.field, name: `Field ${r.field}`, typeField: "F5", price: 0 }
                }

                const field = FieldFactory.create(fieldSource.name, fieldSource.typeField ?? "F5")
                field.setId(fieldSource.id)
                field.setPrice(fieldSource.price ?? 0)

                const userInstance = new User(
                    plainUser.id,
                    plainUser.username,
                    plainUser.email,
                    plainUser.phonenumber
                )

                const reservation = new Reservation(
                    r.id,
                    userInstance,
                    field,
                    new Date(r.start),
                    new Date(r.end),
                    r.paid
                )

                resolve(reservation)
            } catch (err) {
                reject(err)
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
