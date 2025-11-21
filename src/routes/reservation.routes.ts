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
routes.put("/field/:id", reservationController.fieldReservationEdit);
routes.put("/user/:id", reservationController.userReservationEdit);
routes.put("/start/:id", reservationController.startReservationEdit);
routes.put("/end/:id", reservationController.endReservationEdit);
routes.put("/paid/:id", reservationController.paidReservationEdit);

export default routes;
