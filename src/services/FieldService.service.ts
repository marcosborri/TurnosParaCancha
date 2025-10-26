import { Field, TypeField } from '../models/field/field.model';
import fieldRepo from '../models/field/mockField';

export class FieldService {
  //getFields
  async getFields(): Promise<Field[]> {
    return fieldRepo.getFields();
  }

  //getFielById
  async getField(id: number): Promise<Field> {
    if (!id || id <= 0) {
      throw new Error('El ID no es correcto');
    }
    try {
      const field = await fieldRepo.getField(id);
      return field;
    } catch (error) {
      throw new Error(`No hay cancha con ese id ${error}`);
    }
  }

  //addField (habria que ver bien el ID en el mockField.ts) en base de datos se crea solo cuando conectemos con una, por lo tanto no se va a necesitar validacion si es repetido
  async addField(data: { name: string; type: TypeField; price: number }): Promise<Field> {
    try {
      const newField = new Field(0, data.name, data.type, data.price);
      return await fieldRepo.addField(newField);
    } catch (error) {
      throw new Error(`Error al agregar la cancha ${error}`);
    }
  }

  //Editar nombre
  async nameFieldEdit(data: { id: number; name: string }): Promise<Field> {
    try {
      if (!data.id) {
        throw new Error('Necesito un ID para poder editar la cancha');
      }

      const fieldToEdit = await fieldRepo.getField(data.id);

      if (!fieldToEdit) {
        throw new Error('Cancha no existente');
      }

      fieldToEdit.setName(data.name);

      await fieldRepo.editFieldName(data.id, data.name);

      return fieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar la cancha ${error}`);
    }
  }

  //Editar Tipo de cancha
  async typeFieldEdit(data: { id: number; type: TypeField }): Promise<Field> {
    try {
      if (!data.id) {
        throw new Error('Necesito un ID para poder editar la cancha');
      }

      const typeFieldToEdit = await fieldRepo.getField(data.id);

      if (!typeFieldToEdit) {
        throw new Error('Cancha no existente');
      }

      typeFieldToEdit.setTypeField(data.type);

      await fieldRepo.editFieldType(data.id, data.type);

      return typeFieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar el tipo de la cancha ${error}`);
    }
  }

  //Editar precio de la cancha
  async priceFieldEdit(data: { id: number; price: number }): Promise<Field> {
    try {
      if (!data.id) {
        throw new Error('Necesito un ID para poder editar la cancha');
      }

      const priceFieldToEdit = await fieldRepo.getField(data.id);

      if (!priceFieldToEdit) {
        throw new Error('Cancha no existente');
      }

      priceFieldToEdit.setPrice(data.price);

      await fieldRepo.editFieldPrice(data.id, data.price);

      return priceFieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar el precio de la cancha ${error}`);
    }
  }

  //deleteField
  async deleteField(id: number): Promise<Field> {
    try {
      const fieldToDelete = await fieldRepo.getField(id);

      if (!fieldToDelete) {
        throw new Error('Cancha no existente');
      }

      await fieldRepo.deleteField(fieldToDelete.getId());

      return fieldToDelete;
    } catch (error) {
      throw new Error(`Error al eliminar la cancha ${error}`);
    }
  }
}

export default new FieldService();
