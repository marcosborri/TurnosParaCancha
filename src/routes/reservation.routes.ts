import { Router } from 'express';
import reservationController from '../controllers/reservation.controller';

const routes = Router();

routes.get('/', reservationController.getAllReservations);
routes.get('/:id', reservationController.getReservationById);
routes.post('/', reservationController.addNewReservation);
routes.post('/:id', reservationController.eliminateReservation);
routes.put('/field', reservationController.fieldReservationEdit);
routes.put('/user', reservationController.userReservationEdit);
routes.put('/start', reservationController.startReservationEdit);
routes.put('/end', reservationController.endReservationEdit);
routes.put('/paid', reservationController.paidReservationEdit);

export default routes;
