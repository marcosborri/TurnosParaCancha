import { FieldCrud } from "../../interface/fieldCrud.model";
import { Field, TypeField } from "../../field.model";

export class MockField implements FieldCrud {
  getField(id: number): Promise<Field> {
    throw new Error("Method not implemented.");
  }
  getFields(): Promise<Array<Field>> {
    throw new Error("Method not implemented.");
  }
  addField(field: Field): Promise<Field> {
    throw new Error("Method not implemented.");
  }
  editFieldName(id: number, name: string): Promise<Field> {
    throw new Error("Method not implemented.");
  }
  editFieldType(id: number, type: TypeField): Promise<Field> {
    throw new Error("Method not implemented.");
  }
  editFieldPrice(id: number, price: number): Promise<Field> {
    throw new Error("Method not implemented.");
  }
  deleteField(id: number): string {
    throw new Error("Method not implemented.");
  }
}

export default new MockField();
