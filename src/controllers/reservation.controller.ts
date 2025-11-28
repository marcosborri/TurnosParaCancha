import { Request, Response } from "express";
import { ReservationService } from "../services/ReservationService.service";
import { Observer } from "../models/observer/observer.interface";
import { Reservation } from "../models/reservation.model";
import { FieldService } from "../services/FieldService.service";
import { UserService } from "../services/UserService.service";
import { reservationSubject } from "../models/observer/reservation.interface";
import { ReservationObserver } from "../models/observer/reservationObserver";

export class ReservationController {
  constructor(
    private reservationService: ReservationService,
    private userService: UserService,
    private fieldService: FieldService,
    private subject = reservationSubject
  ) {}

  //Observer
  addObserver(observer: Observer) {
    this.subject.subscribe(observer);
  }

  // Helpers to safely extract values from instances or plain objects
  private getFieldIdFromReservation(r: any): number | undefined {
    try {
      if (!r) return undefined;
      if (typeof r.getField === "function") return r.getField().getId();
      if (r.field) {
        return r.field.id ?? r.field._id ?? undefined;
      }
      return r.fieldId ?? undefined;
    } catch {
      return undefined;
    }
  }

  private getStartFromReservation(r: any): Date | undefined {
    try {
      if (!r) return undefined;
      if (typeof r.getStart === "function") return r.getStart();
      const val = r.start ?? r.startDate;
      return val ? new Date(val) : undefined;
    } catch {
      return undefined;
    }
  }

  private getEndFromReservation(r: any): Date | undefined {
    try {
      if (!r) return undefined;
      if (typeof r.getEnd === "function") return r.getEnd();
      const val = r.end ?? r.endDate;
      return val ? new Date(val) : undefined;
    } catch {
      return undefined;
    }
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
    const id = req.params.id;
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
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  //Agregar una reserva
  addNewReservation = async (req: Request, res: Response) => {
    const { field, user, start, end, paid } = req.body;

    if (
      field === undefined ||
      user === undefined ||
      !start ||
      !end ||
      paid === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Faltan datos para crear una reserva" });
    }

    const parseId = (v: any) => {
      if (typeof v === "number") return v;
      if (typeof v === "string" && v.trim() !== "") return Number(v);
      if (v && typeof v === "object") return Number(v.id ?? v._id ?? v.idField);
      return NaN;
    };

    const fieldId = parseId(field);
    const userId = parseId(user);

    if (isNaN(fieldId) || isNaN(userId)) {
      return res.status(400).json({ error: "Field or user id inválido" });
    }

    try {
      const fieldObj = await this.fieldService.getField(Number(fieldId));
      const userObj = await this.userService.getUser(Number(userId));
      const startDate = new Date(start);
      const endDate = new Date(end);

      const allReservations = await this.reservationService.getReservations();

      const searchSameReservation = allReservations.find((r: any) => {
        const rFieldId = this.getFieldIdFromReservation(r);
        const rStart = this.getStartFromReservation(r);
        const rEnd = this.getEndFromReservation(r);

        const sameField =
          rFieldId !== undefined && rFieldId === fieldObj.getId();
        const sameStart = rStart && rStart.getTime() === startDate.getTime();
        const sameEnd = rEnd && rEnd.getTime() === endDate.getTime();

        return sameField && sameStart && sameEnd;
      });

      if (searchSameReservation) {
        const observer = new ReservationObserver(userObj.getEmail());
        this.addObserver(observer);

        this.subject.notify(
          "Reserva no disponible, le avisaremos cuando se libere"
        );
        return res.status(400).json({
          message:
            "Hour reserved. We will contact you when the reserve is free",
        });
      }

      const reservation = new Reservation(
        0,
        userObj,
        fieldObj,
        startDate,
        endDate,
        paid
      );
      const saved = await this.reservationService.addReservation(reservation);
      return res.status(201).json(saved);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? error });
    }
  };

  //Eliminar una reserva
  eliminateReservation = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID no es correcto" });
    }

    try {
      await this.reservationService.deleteReservation(Number(id));
      this.subject.notify(`La reserva ${id} se liberó`);

      return res
        .status(200)
        .json({ message: `Reservation with ID: ${id} eliminated` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  };

  //Editar campos
  fieldReservationEdit = async (req: Request, res: Response) => {
    // aceptar id en params o en body
    const idParam = req.params?.id ?? req.body?.id;
    const fieldBody = req.body?.field;

    if (!idParam || fieldBody === undefined) {
      return res.status(400).json({ error: "Falta completar campos" });
    }

    const id = Number(idParam);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido" });
    }

    // parsear field: puede venir como número, string, o { id: X }
    const parseFieldId = (v: any) => {
      if (typeof v === "number") return v;
      if (typeof v === "string" && v.trim() !== "") return Number(v);
      if (v && typeof v === "object") return Number(v.id ?? v._id);
      return NaN;
    };

    const fieldId = parseFieldId(fieldBody);
    if (isNaN(fieldId) || fieldId <= 0) {
      return res.status(400).json({ error: "Field id inválido" });
    }

    try {
      // obtener el Field completo desde el servicio (lanza error si no existe)
      const fieldObj = await this.fieldService.getField(Number(fieldId));

      // llamar al servicio de reservas con una instancia/objeto Field
      const updated = await this.reservationService.editReservationField({
        id,
        field: fieldObj,
      });

      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? error });
    }
  };

  userReservationEdit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = req.body.user;
    if (!id || user === undefined) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const userId = typeof user === "number" ? user : Number(user?.id ?? user);
      if (isNaN(userId))
        return res.status(400).json({ error: "User id inválido" });
      const userObj = await this.userService.getUser(Number(userId));
      const updated = await this.reservationService.editReservationUser({
        id: Number(id),
        user: userObj,
      });
      return res.status(200).json(updated);
    } catch (error: any) {
      return res.status(400).json({ error: error?.message ?? error });
    }
  };

  startReservationEdit = async (req: Request, res: Response) => {
    const id = req.params.id;
    const start = req.body.start;
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
    const id = req.params.id;
    const end = req.body.end;
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
    const id = req.params.id;
    const paid = req.body.paid;
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
