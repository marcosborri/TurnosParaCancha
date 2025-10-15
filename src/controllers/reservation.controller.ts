import { request, Request, Response } from "express";
import ReservationService from "../services/ReservationService.service";

export class ReservationController {
  //Llamar a todas las reservar
  async getAllReservations(req: Request, res: Response) {
    try {
      const allReservations = await ReservationService.getReservations();
      return res.status(200).json(allReservations);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  //Llamar reserva por ID
  async getReservationById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ error: "Problemas con el ID, no se encuentra" });
    }
    try {
      const getReservationById = await ReservationService.getReservation(
        Number(id)
      );
      return res.status(200).json(getReservationById);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  //Agregar una reserva
  async addNewReservation(req: Request, res: Response) {
    const { field, user, start, end, paid } = req.body;

    if (!field || !user || !start || !end || !paid) {
      return res
        .status(400)
        .json({ error: "Faltan datos para crear una reserva" });
    }
    try {
      const newReservation = await ReservationService.addReservation({
        field,
        user,
        start,
        end,
        paid,
      });
      return res.status(200).json(newReservation);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  //Eliminar una reserva
  async eliminateField(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID no es correcto" });
    }
    try {
      const reservationDeleted = await ReservationService.deleteReservation(
        Number(id)
      );
      return res.status(200).json(reservationDeleted);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  //Editar campos
  async fieldReservationEditasync(req: Request, res: Response) {
    const { id, field } = req.body;
    if (!id || !field) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const fieldEdited = await ReservationService.editReservationField({
        id,
        field,
      });
      return res.status(200).json(fieldEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async userReservationEdit(req: Request, res: Response) {
    const { id, user } = req.body;
    if (!id || !user) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const userEdited = await ReservationService.editReservationUser({
        id,
        user,
      });
      return res.status(200).json(userEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async startReservationEdit(req: Request, res: Response) {
    const { id, start } = req.body;
    if (!id || !start) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const startEdited = await ReservationService.editReservationStart({
        id,
        start,
      });
      return res.status(200).json(startEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async endReservationEdit(req: Request, res: Response) {
    const { id, end } = req.body;
    if (!id || !end) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const endEdited = await ReservationService.editReservationEnd({
        id,
        end,
      });
      return res.status(200).json(endEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async paidReservationEdit(req: Request, res: Response) {
    const { id, paid } = req.body;
    if (!id || !paid) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const paidEdited = await ReservationService.editReservationPaid({
        id,
        paid,
      });
      return res.status(200).json(paidEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
