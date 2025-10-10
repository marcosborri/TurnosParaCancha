import { FieldCrud } from "./interface/fieldCrud.model";
import { Field, TypeField } from "./field.model";

export class MockField implements FieldCrud {
  getField(id: number): Field {
    throw new Error("Method not implemented.");
  }
  getFields(): Array<Field> {
    throw new Error("Method not implemented.");
  }
  addField(field: Field): string {
    throw new Error("Method not implemented.");
  }
  editFieldName(id: number, name: string): string {
    throw new Error("Method not implemented.");
  }
  editFieldType(id: number, type: TypeField): string {
    throw new Error("Method not implemented.");
  }
  editFieldPrice(id: number, price: number): string {
    throw new Error("Method not implemented.");
  }
  deleteField(id: number): string {
    throw new Error("Method not implemented.");
  }
}
