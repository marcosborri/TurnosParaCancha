import { Field, TypeField } from "../models/field/field.model";
import mockField from "../models/field/mockField";
import fieldRepo from "../models/field/mockField";

export class FieldService {
  //getFields
  async getFields(): Promise<Field[]> {
    return fieldRepo.getFields();
  }

  //getFielById
  async getField(id: number): Promise<Field> {
    if (!id) {
      throw new Error("El ID no es correcto");
    }
    try {
      const field = await fieldRepo.getField(id);
      return field;
    } catch (error) {
      throw new Error(`No hay cancha con ese id ${error}`);
    }
  }

  //addField (habria que ver bien el ID en el mockField.ts) en base de datos se crea solo cuando conectemos con una, por lo tanto no se va a necesitar validacion si es repetido
  async addField(data: {
    name: string;
    type: TypeField;
    price: number;
  }): Promise<Field> {
    try {
      const newField = new Field(0, data.name, data.type, data.price);
      return await fieldRepo.addField(newField);
    } catch (error) {
      throw new Error(`Error al agregar la cancha ${error}`);
    }
  }

  //editField
  async editField(data: {
    id: number;
    name: string;
    type: TypeField;
    price: number;
  }): Promise<Field> {
    try {
      if (!data.id) {
        throw new Error("Necesito un ID para poder editar la cancha");
      }

      const fieldToEdit = await fieldRepo.getField(data.id);

      if (!fieldToEdit) {
        throw new Error("Cancha no existente");
      }

      fieldToEdit.setName(data.name);
      fieldToEdit.setTypeField(data.type);
      fieldToEdit.setPrice(data.price);

      await fieldRepo.editFieldName(data.id, data.name);
      await fieldRepo.editFieldType(data.id, data.type);
      await fieldRepo.editFieldPrice(data.id, data.price);

      return fieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar la cancha ${error}`);
    }
  }

  //deleteField
  async deleteField(id: number): Promise<Field> {
    try {
      const fieldToDelete = await fieldRepo.getField(id);

      if (!fieldToDelete) {
        throw new Error("Cancha no existente");
      }

      await fieldRepo.deleteField(fieldToDelete.getId());

      return fieldToDelete;
    } catch (error) {
      throw new Error(`Error al eliminar la cancha" ${error}`);
    }
  }
}
