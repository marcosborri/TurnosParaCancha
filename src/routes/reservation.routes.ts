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

routes.get("/", reservationController.getAllReservations);
routes.get("/:id", reservationController.getReservationById);
routes.post("/", reservationController.addNewReservation);
routes.delete("/:id", reservationController.eliminateReservation);
routes.put("/field", reservationController.fieldReservationEdit);
routes.put("/user", reservationController.userReservationEdit);
routes.put("/start", reservationController.startReservationEdit);
routes.put("/end", reservationController.endReservationEdit);
routes.put("/paid", reservationController.paidReservationEdit);

export default routes;
