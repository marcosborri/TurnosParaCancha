import { Field, TypeField } from "../models/field.model";
import fieldRepo from "../models/implementations/mock/mockField";
import reservationRepo from "../models/implementations/mock/mockReservation";
import { reservationSubject } from "../models/observer/reservation.interface";

export class FieldService {
  //getFields
  async getFields(): Promise<Field[]> {
    return fieldRepo.getFields();
  }

  //getFielById
  async getField(id: number): Promise<Field> {
    if (!id || id <= 0) {
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
      return await fieldRepo.addField(data);
    } catch (error) {
      throw new Error(`Error al agregar la cancha ${error}`);
    }
  }

  //Editar nombre
  async nameFieldEdit(data: { id: number; name: string }): Promise<Field> {
    try {
      if (!data.id) {
        throw new Error("Necesito un ID para poder editar la cancha");
      }

      const fieldToEdit = await fieldRepo.getField(data.id);

      if (!fieldToEdit) {
        throw new Error("Cancha no existente");
      }

      fieldToEdit.setName(data.name);

      await fieldRepo.nameFieldEdit({ id: data.id, name: data.name });

      return fieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar la cancha ${error}`);
    }
  }

  //Editar Tipo de cancha
  async typeFieldEdit(data: { id: number; type: TypeField }): Promise<Field> {
    try {
      if (!data.id) {
        throw new Error("Necesito un ID para poder editar la cancha");
      }

      const typeFieldToEdit = await fieldRepo.getField(data.id);

      if (!typeFieldToEdit) {
        throw new Error("Cancha no existente");
      }

      typeFieldToEdit.setTypeField(data.type);

      await fieldRepo.typeFieldEdit({ id: data.id, type: data.type });

      return typeFieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar el tipo de la cancha ${error}`);
    }
  }

  //Editar precio de la cancha
  async priceFieldEdit(data: { id: number; price: number }): Promise<Field> {
    try {
      if (!data.id) {
        throw new Error("Necesito un ID para poder editar la cancha");
      }

      const priceFieldToEdit = await fieldRepo.getField(data.id);

      if (!priceFieldToEdit) {
        throw new Error("Cancha no existente");
      }

      priceFieldToEdit.setPrice(data.price);

      await fieldRepo.priceFieldEdit({ id: data.id, price: data.price });

      return priceFieldToEdit;
    } catch (error) {
      throw new Error(`Error al editar el precio de la cancha ${error}`);
    }
  }

  //deleteField
  async deleteField(id: number): Promise<void> {
    try {
      const fieldToDelete = await fieldRepo.getField(id);

      if (!fieldToDelete) {
        throw new Error("Cancha no existente");
      }

      // Buscar todas las reservas asociadas a esta cancha
      const reservations = await reservationRepo.getReservations();

      const toDelete = reservations.filter((r) => r.getField().getId() === id);

      // 🔥 Borrar reservas y notificar
      for (const reservation of toDelete) {
        await reservationRepo.deleteReservation(reservation.getId());
        reservationSubject.notify(
          `La reserva ${reservation.getId()} se cancelo porque se eliminó la cancha`
        );
      }

      // Finalmente borrar la cancha
      await fieldRepo.deleteField(id);
    } catch (error) {
      throw new Error(`Error al eliminar la cancha ${error}`);
    }
  }
}
export default new FieldService();
