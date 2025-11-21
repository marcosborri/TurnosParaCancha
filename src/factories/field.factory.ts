import { Field, TypeField } from "../models/field.model";
import { Football11 } from "../models/footballFields/F11.models.footballField";
import { Football5 } from "../models/footballFields/F5.models.footballField";
import { Football6 } from "../models/footballFields/F6.models.footballField";

export class FieldFactory {
  static create(name: string, type: TypeField, price: number): Field {
    switch (type) {
      case "F5":
        return new Football5(name, price);
      case "F6":
        return new Football6(name, price);
      case "F11":
        return new Football11(name, price);
      default:
        throw new Error(`Tipo de cancha '${type}' no soportado`);
    }
  }
}
