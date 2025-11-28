import { Field, TypeField } from "../models/field.model";
import fieldRepo from "../models/implementations/mock/mockField";
import reservationRepo from "../models/implementations/mock/mockReservation";
import { reservationSubject } from "../models/observer/reservation.interface";
import { loadData } from "../utils/jsonFunctions.utils";

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

  //Agregar cancha
  async addField(data: { name: string; type: TypeField }): Promise<Field> {
    return fieldRepo.addField(data);
  }

  //Editar nombre
  editFieldName(id: number, name: string): Promise<Field> {
    return fieldRepo.editFieldName(id, name);
  }

  //Editar Tipo de cancha
  editTypeField(id: number, type: TypeField): Promise<Field> {
    return fieldRepo.editFieldType(id, type);
  }

  //Editar precio de la cancha
  async editFieldPrice(id: number, price: number): Promise<Field> {
    return fieldRepo.editFieldPrice(id, price);
  }

  //deleteField
  async deleteField(id: number): Promise<void> {
    try {
      const fieldToDelete = await fieldRepo.getField(id);
      if (!fieldToDelete) {
        throw new Error("Cancha no existente");
      }

      const rawReservations = await loadData("src/database/reservation.json");

      const toDelete = rawReservations.filter((r: any) => {
        const fieldId = typeof r.field === "object" ? r.field.id : r.field;
        return Number(fieldId) === Number(id);
      });

      for (const r of toDelete) {
        await reservationRepo.deleteReservation(r.id);

        reservationSubject.notify(
          `La reserva ${r.id} fue cancelada porque se eliminó la cancha`
        );
      }

      //Finalmente borrar la cancha
      await fieldRepo.deleteField(id);
    } catch (error) {
      throw new Error(`Error al eliminar la cancha: ${error}`);
    }
  }
}
export default new FieldService();
