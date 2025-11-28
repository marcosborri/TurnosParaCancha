import { Router } from "express";
import ReservationController from "../controllers/reservation.controller";

// Importás servicios, NO el repo
import reservationService from "../services/ReservationService.service";
import userService from "../services/UserService.service";
import fieldService from "../services/FieldService.service";

const reservationController = new ReservationController(
  reservationService,
  userService,
  fieldService
);

const routes = Router();

/**
 * @openapi
 * /reservations:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags:
 *       - Reservations
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida correctamente
 */
routes.get("/", reservationController.getAllReservations);

/**
 * @openapi
 * /reservations/{id}:
 *   get:
 *     summary: Obtener reserva por ID
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */
routes.get("/:id", reservationController.getReservationById);

/**
 * @openapi
 * /reservations:
 *   post:
 *     summary: Crear reserva
 *     tags:
 *       - Reservations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - field
 *               - user
 *               - start
 *               - end
 *               - paid
 *             properties:
 *               field:
 *                 type: integer
 *                 example: 1
 *               user:
 *                 type: integer
 *                 example: 5
 *               start:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-01T15:00:00Z"
 *               end:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-01T16:00:00Z"
 *               paid:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 *       400:
 *         description: Datos inválidos o reserva duplicada
 */
routes.post("/", reservationController.addNewReservation);

/**
 * @openapi
 * /reservations/{id}:
 *   delete:
 *     summary: Eliminar reserva
 *     tags:
 *       - Reservations
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva eliminada correctamente
 */
routes.delete("/:id", reservationController.eliminateReservation);

/**
 * @openapi
 * /reservations/field/{id}:
 *   put:
 *     summary: Editar cancha asignada a una reserva
 *     tags:
 *       - Reservations
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [field]
 *             properties:
 *               field:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cancha actualizada correctamente
 */
routes.put("/field/:id", reservationController.fieldReservationEdit);

/**
 * @openapi
 * /reservations/user/{id}:
 *   put:
 *     summary: Editar usuario asignado a una reserva
 *     tags:
 *       - Reservations
 */
routes.put("/user/:id", reservationController.userReservationEdit);

/**
 * @openapi
 * /reservations/start/{id}:
 *   put:
 *     summary: Editar fecha de inicio de la reserva
 *     tags:
 *       - Reservations
 */
routes.put("/start/:id", reservationController.startReservationEdit);

/**
 * @openapi
 * /reservations/end/{id}:
 *   put:
 *     summary: Editar fecha de fin de la reserva
 *     tags:
 *       - Reservations
 */
routes.put("/end/:id", reservationController.endReservationEdit);

/**
 * @openapi
 * /reservations/paid/{id}:
 *   put:
 *     summary: Editar estado de pago de la reserva
 *     tags:
 *       - Reservations
 */
routes.put("/paid/:id", reservationController.paidReservationEdit);

export default routes;
