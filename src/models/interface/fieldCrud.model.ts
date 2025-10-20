import { Field, TypeField } from "../field.model";

export interface FieldCrud {
  getField(id: number): Promise<Field>;
  getFields(): Promise<Array<Field>>;
  addField(field: Field): Promise<Field>;
  editFieldName(id: number, name: string): Promise<Field>;
  editFieldType(id: number, type: TypeField): Promise<Field>;
  editFieldPrice(id: number, price: number): Promise<Field>;
  deleteField(id: number): void;
}
