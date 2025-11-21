import { Request, Response } from "express";
import { ReservationCrud } from "../models/interface/reservationCrud.model";
import { UserCrud } from "../models/interface/userCrud.model";
import { FieldCrud } from "../models/interface/fieldCrud.model";
import { Observer } from "../models/observer/observer.interface";
import { Reservation } from "../models/reservation.model";
import { reservationSubject } from "../models/observer/reservation.interface";
import { ReservationObserver } from "../observers/reservationObserver";

export class ReservationController {
  constructor(
    private reservationService: ReservationCrud,
    private userService: UserCrud,
    private fieldService: FieldCrud,
    private subject = reservationSubject
  ) {}

  //Observer
  addObserver(observer: Observer) {
    this.subject.subscribe(observer);
  }

  //Llamar a todas las reservar
  getAllReservations = async (req: Request, res: Response) => {
    try {
      const allReservations = await this.reservationService.getReservations();
      return res.status(200).json(allReservations);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  //Llamar reserva por ID
  getReservationById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Problemas con el ID, no se encuentra" });
    }
    try {
      const getReservationById = await this.reservationService.getReservation(
        Number(id)
      );
      return res.status(200).json(getReservationById);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  //Agregar una reserva
  addNewReservation = async (req: Request, res: Response) => {
    const { field, user, start, end, paid } = req.body;

    if (!field || !user || !start || !end || paid === undefined) {
      return res
        .status(400)
        .json({ error: "Faltan datos para crear una reserva" });
    }

    try {
      const fieldObj = await this.fieldService.getField(Number(field));
      const userObj = await this.userService.getUser(Number(user));
      const startDate = new Date(start);
      const endDate = new Date(end);

      const allReservations = await this.reservationService.getReservations();

      const searchSameReservation = allReservations.find((r: Reservation) => {
        const field = r.getField().getId() === fieldObj.getId();
        const start = r.getStart().getTime() === startDate.getTime();
        const end = r.getEnd().getTime() === endDate.getTime();
        return field && start && end;
      });

      if (searchSameReservation) {
        const observer = new ReservationObserver(userObj.getEmail());
        this.addObserver(observer);

        return res.status(400).json({
          message: "Hour reserved. We will contact you if reserve free",
        });
      }

      const reservation = new Reservation(
        0, // ID lo setea el repo
        userObj,
        fieldObj,
        startDate,
        endDate,
        paid
      );
      const saved = await this.reservationService.addReservation(reservation);
      return res.status(201).json(saved);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  //Eliminar una reserva
  eliminateReservation = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID no es correcto" });
    }
    try {
      const reservationDelete = await this.reservationService.deleteReservation(
        Number(id)
      );
      this.subject.notify(`La reserva ${id} se liberó`);

      return res.status(200).json({
        message: `Reserva ${id} eliminada correctamente`,
        reservation: reservationDelete,
      });
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  //Editar campos
  fieldReservationEdit = async (req: Request, res: Response) => {
    const { id, field } = req.body;
    if (!id || !field) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const fieldObj = await this.fieldService.getField(Number(field));
      const updated = await this.reservationService.editReservationField({
        id: Number(id),
        field: fieldObj,
      });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  userReservationEdit = async (req: Request, res: Response) => {
    const { id, user } = req.body;
    if (!id || !user) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const userObj = await this.userService.getUser(Number(user));
      const updated = await this.reservationService.editReservationUser({
        id: Number(id),
        user: userObj,
      });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  startReservationEdit = async (req: Request, res: Response) => {
    const { id, start } = req.body;
    if (!id || !start) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const startEdited = await this.reservationService.editReservationStart({
        id: Number(id),
        start: new Date(start),
      });
      return res.status(200).json(startEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  endReservationEdit = async (req: Request, res: Response) => {
    const { id, end } = req.body;
    if (!id || !end) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const endEdited = await this.reservationService.editReservationEnd({
        id: Number(id),
        end: new Date(end),
      });
      return res.status(200).json(endEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };

  paidReservationEdit = async (req: Request, res: Response) => {
    const { id, paid } = req.body;
    if (!id || paid === undefined) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const paidEdited = await this.reservationService.editReservationPaid({
        id: Number(id),
        paid,
      });
      return res.status(200).json(paidEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  };
}

export default ReservationController;
