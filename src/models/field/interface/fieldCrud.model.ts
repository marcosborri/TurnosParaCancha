import { Field, TypeField } from "../field.model";

export interface FieldCrud {
  getField(id: number): Field;
  getFields(): Array<Field>;
  addField(field: Field): Field;
  editFieldName(id: number, name: string): Field;
  editFieldType(id: number, type: TypeField): Field;
  editFieldPrice(id: number, price: number): Field;
  deleteField(id: number): string;
}
