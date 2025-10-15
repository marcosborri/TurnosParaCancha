import { Request, Response } from "express";
import FieldService from "../services/FieldService.service";
export class FieldController {
  async getAllFields(req: Request, res: Response) {
    try {
      const allFields = await FieldService.getFields();
      return res.status(200).json(allFields);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async getFieldById(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Problemas con el ID, no se encuentra" });
    }
    try {
      const field = await FieldService.getField(Number(id));
      return res.status(200).json(field);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async addNewField(req: Request, res: Response) {
    const { name, type, price } = req.body;
    if (!name || !type || !price) {
      return res
        .status(400)
        .json({ error: "Faltan datos para crear una cancha" });
    }
    try {
      const newField = await FieldService.addField({
        name: name,
        type: type,
        price: price,
      });
      return res.status(201).json(newField);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async eliminateField(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "ID no es correcto" });
    }
    try {
      const fieldDeleted = await FieldService.deleteField(Number(id));
      return res.status(200).json(fieldDeleted);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async editName(req: Request, res: Response) {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const nameEdited = await FieldService.nameFieldEdit({ id, name });
      return res.status(200).json(nameEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async editType(req: Request, res: Response) {
    const { id, type } = req.body;
    if (!id || !type) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const typeEdited = await FieldService.typeFieldEdit({ id, type });
      return res.status(200).json(typeEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }

  async editPrice(req: Request, res: Response) {
    const { id, price } = req.body;
    if (!id || !price) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const priceEdited = await FieldService.priceFieldEdit({ id, price });
      return res.status(200).json(priceEdited);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
}
