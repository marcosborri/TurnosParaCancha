import { Request, Response } from "express";
import FieldService from "../services/FieldService.service";
export class FieldController {
  async getAllFields(req: Request, res: Response) {
    try {
      const allFields = await FieldService.getFields();
      return res.status(200).json(allFields);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async getFieldById(req: Request, res: Response) {
    const id = req.params.id;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Problemas con el ID, no se encuentra" });
    }
    try {
      const field = await FieldService.getField(Number(id));
      return res.status(200).json(field);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async addNewField(req: Request, res: Response) {
    const { name, type } = req.body;
    if (!name || !type) {
      return res
        .status(400)
        .json({ error: "Faltan datos para crear una cancha" });
    }
    try {
      const newField = await FieldService.addField({
        name: name,
        type: type,
      });
      return res.status(201).json(newField);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async eliminateField(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "ID no es correcto" });
    }
    try {
      await FieldService.deleteField(Number(id));
      return res
        .status(200)
        .json({ message: `Field with ID: ${id} eliminated` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async editName(req: Request, res: Response) {
    const id = req.params.id;
    const name = req.body.name;
    if (!id || !name) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      await FieldService.editFieldName(Number(id), name);
      return res.status(200).json({ message: `Name changed succesfully` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async editType(req: Request, res: Response) {
    const id = req.params.id;
    const typeField = req.body.typeField;
    if (!id || !typeField) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const typeEdited = await FieldService.editTypeField(
        Number(id),
        typeField
      );
      return res.status(200).json({ message: `Type changed succesfully` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async editPrice(req: Request, res: Response) {
    const id = req.params.id;
    const price = req.body.price;
    if (!id || !price) {
      return res.status(400).json({ error: "Falta completar campos" });
    }
    try {
      const priceEdited = await FieldService.editFieldPrice(Number(id), price);
      return res.status(200).json({ message: `Price changed succesfully` });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}

export default new FieldController();
