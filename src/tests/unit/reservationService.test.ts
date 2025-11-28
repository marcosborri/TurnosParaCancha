// import { describe, it, expect, beforeAll } from "vitest";
// import ReservationService from './../../services/ReservationService.service';
// import { Reservation } from "../../models/reservation.model";
// import { Field } from "../../models/field.model";
// import { User } from "../../models/user.model"
// import reservationRepo from "../../models/implementations/mock/mockReservation";

// let reservation1: Reservation
// let user1: User
// let field1: Field


// let user2: User
// let field2: Field

// beforeAll(async () => {
//   user2 = new User(2, "John", "John@gmail.com", 2910000022)
//   field2 = new Field(2, "Cancha_B", "F7", 39000)

//   user1 = new User(1, "Carl", "Carl@gmail.com", 2910000011)
//   field1 = new Field(1, "Cancha_A", "F7", 39000)
//   reservation1 = new Reservation(1, user1, field1, new Date("2025-9-12T18:00:00"), new Date("2025-9-12T19:00:00"), true);
//   await reservationRepo.addReservation(reservation1)
// });

// describe('Reglas de servicio - ReservationService', ()=>{
//     it('El id es incorrecto', async () => {
//         await expect(ReservationService.getReservation(-912)).rejects.toThrow("ID no valido");
//     });

//     it('No encuentra reserva con id', async () => {
//         await expect(ReservationService.getReservation(2)).rejects.toThrow("Error de ID para la reserva Error: Reservation with id 2 doesnt exist")
//     });

//     it("Obtiene una reserva correctamente", async () => {
//         const reserva = await ReservationService.getReservation(1);
//         expect(reserva.getId()).toBe(1);
//     });

//     it("Agrega una nueva reserva", async () => {
//         const data = {field2, user2, start: new Date("2025-9-12T21:00:00"), end: new Date("2025-10-25T15:00:00"), paid: false};
//         const reservaAgregada = await ReservationService.addReservation(data);
//         expect(reservaAgregada.getId()).toBe(2);
//     });

//     it("No puede eliminar una cancha inexistente", async () => {
//         await expect(ReservationService.deleteReservation(999)).rejects.toThrow("Error al eliminar la reserva Error: Reservation with id 999 doesnt exist");
//     });
// })