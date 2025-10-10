import { Field, TypeField } from "../field.model";

export interface FieldCrud {
  getField(id: number): Field;
  getFields(): Array<Field>;
  addField(field: Field): string;
  editFieldName(id: number, name: string): string;
  editFieldType(id: number, type: TypeField): string;
  editFieldPrice(id: number, price: number): string;
  deleteField(id: number): string;
}
