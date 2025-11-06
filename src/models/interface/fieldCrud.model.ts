import { Field, TypeField } from "../field.model";

export interface FieldCrud {
  addField(data: { name: string; type: TypeField; price: number }): Promise<Field>;
  getField(id: number): Promise<Field>;
  getFields(): Promise<Array<Field>>;
  editFieldName(id: number, name: string): Promise<Field>;
  editFieldType(id: number, type: TypeField): Promise<Field>;
  editFieldPrice(id: number, price: number): Promise<Field>;
  deleteField(id: number): Promise<void>;
}
