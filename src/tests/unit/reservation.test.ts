import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { Reservation } from "../../models/mock/reservation/reservation.model";
import { User } from "../../models/mock/user/user.model";
import { Field } from "../../models/mock/field/field.model";
import { MockReservation } from "../../models/mock/reservation/mockReservation";


let reservation2: Reservation;
let user2: User;
let field2: Field;

beforeAll(() => {
  user2 = new User(2, "panchito04", "panchito04@gmail.com", 2910010011);
  field2 = new Field(2, "CanchaFutbol_B", "F7", 35000);
  reservation2 = new Reservation(
    2,
    user2,
    field2,
    new Date("2025-9-12T18:00:00"),
    new Date("2025-9-12T19:00:00"),
    true
  );
});

let user1: User;
let field1: Field;
let reservation1: Reservation;
let mock: MockReservation;

beforeEach(async () => {
  user1 = new User(1, "marulete03", "marulete03@gmail.com", 2910020022);
  field1 = new Field(1, "CanchaFutbol_A", "F5", 30000);
  reservation1 = new Reservation(
    1,
    user1,
    field1,
    new Date("2025-9-12T15:00:00"),
    new Date("2025-9-12T16:00:00"),
    true
  );

  mock = new MockReservation();
  await mock.addReservation(reservation1);
});

describe("Operaciones CRUD de mockReservation", () => {
  it("Obtener Reservas", async () => {
    const reservas = await mock.getReservations();

    expect(reservas.length).toBeGreaterThan(0);
  });

  it("Obtener Reserva por id", async () => {
    const id = reservation1.getId();
    const reservaEncontrada = await mock.getReservation(id);

    expect(reservaEncontrada).toEqual(reservation1);
  });

  it("Agregar una reserva", async () => {
    const reservaAgregada = await mock.addReservation(reservation2);
    const reservas = await mock.getReservations();

    expect(reservas.length).toBe(2);
  });

  it("Editar la cancha de la reserva", async () => {
    const id = reservation1.getId();
    const nuevoField = new Field(3, "CanchaFutbol_C", "F11", 40000);

    await mock.editReservationField(id, nuevoField);
    const reservaEditada = await mock.getReservation(id);

    expect(reservaEditada.getField()).toEqual(nuevoField);
  });

  it("Editar el usuario de la reserva", async () => {
    const id = reservation1.getId();
    const nuevoUser = new User(
      3,
      "Jeremias01",
      "Jeremias01@gmail.com",
      2910030033
    );

    await mock.editReservationUser(id, nuevoUser);
    const reservaEditada = await mock.getReservation(id);

    expect(reservaEditada.getUser()).toEqual(nuevoUser);
  });

  it("Editar si fue pagada la reserva", async () => {
    const id = reservation1.getId();
    const noPagado = false;

    await mock.editReservationPaid(id, noPagado);
    const reservaEditada = await mock.getReservation(id);

    expect(reservaEditada.getPaid()).toBe(noPagado);
  });

  it("Editar el horario de inicio del turno", async () => {
    const id = reservation1.getId();
    const nuevaFecha = new Date("2025-9-12T12:00:00");

    await mock.editReservationStart(id, nuevaFecha);
    const reservaEditada = await mock.getReservation(id);

    expect(reservaEditada.getStart()).toEqual(nuevaFecha);
  });

  it("Editar el horario de finalizacion del turno", async () => {
    const id = reservation1.getId();
    const nuevaFecha = new Date("2025-9-12T13:00:00");

    await mock.editReservationEnd(id, nuevaFecha);
    const reservaEditada = await mock.getReservation(id);

    expect(reservaEditada.getEnd()).toEqual(nuevaFecha);
  });

  it("Eliminar una reserva", async () => {
    const id = reservation2.getId();

    await mock.deleteReservation(id);
    const reservas = await mock.getReservations();

    expect(reservas.length).toBe(1);
  });
});
