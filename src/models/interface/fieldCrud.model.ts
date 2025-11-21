import { Field, TypeField } from "../field.model";

export interface FieldCrud {
  getField(id: number): Promise<Field>;
  getFields(): Promise<Array<Field>>;
  addField(data: {
    name: string;
    type: TypeField;
    price: number;
  }): Promise<Field>;
  nameFieldEdit(data: { id: number; name: string }): Promise<Field>;
  typeFieldEdit(data: { id: number; type: TypeField }): Promise<Field>;
  priceFieldEdit(data: { id: number; price: number }): Promise<Field>;
  deleteField(id: number): Promise<void>;
}
