import { Field, TypeField } from "../models/field.model";
import { Football11 } from "../models/footballFields/F11.models.footballField";
import { Football5 } from "../models/footballFields/F5.models.footballField";
import { Football6 } from "../models/footballFields/F6.models.footballField";

export class FieldFactory {
  static create(name: string, type: TypeField): Field {
    switch (type) {
      case "F5":
        return new Football5(name);
      case "F6":
        return new Football6(name);
      case "F11":
        return new Football11(name);
      default:
        throw new Error(`Tipo de cancha '${type}' no soportado`);
    }
  }
}
