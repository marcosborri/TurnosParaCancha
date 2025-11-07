import { Reservation } from "../../models/reservation.model";
import { getOneUser } from "./users.fake";
import { getOneField } from "./fields.fake";
import { faker } from '@faker-js/faker'

export const getOneReservation = async (): Promise<Reservation> => {
    const startDate = faker.date.between({from: Date.now(), to: '2025-12-31'})
    const endDate = startDate.setHours(startDate.getHours() + 1)
    const newReservations = new Reservation(faker.number.int({min: 1, max: 100}), await getOneUser(), await getOneField(), startDate, endDate, faker.datatype.boolean())

    return Promise.resolve(newReservations)
}