import { FieldCrud } from "../../interface/fieldCrud.model";
import { Field, TypeField } from "../../field.model";
import { FieldFactory } from "../../../factories/field.factory";

export class MockField implements FieldCrud {

  protected container: Array<Field>
  protected id: number;
  constructor() {
    this.id = 1,
      this.container = new Array<Field>
  }
  getField(id: number): Promise<Field> {
    return new Promise<Field>((resolve, reject) => {
      const result = this.container.find((field: Field) => {
        return field.getId() === id;
      });
      if (!result) {
        reject(new Error(`Field with id:${id} doesnt exist`));
      } else {
        resolve(result);
      }
    })
  }
  getFields(): Promise<Array<Field>> {
    return new Promise<Array<Field>>((resolve) => {
      resolve(this.container);
    });
  }
  addField(data: { name: string; type: TypeField;}): Promise<Field> {
    return new Promise<Field>((resolve) => {
      const field = FieldFactory.create(data.name, data.type);
      field.setId(this.id++);
      this.container.push(field);
      resolve(field)
    });

  }
  editFieldName(id: number, name: string): Promise<Field> {
    return new Promise<Field>((resolve, reject) => {
      const fieldFound = this.container.find((field: Field) => field.getId() === id);
      if (!fieldFound) {
        reject(new Error(`Field with id:${id} doesnt exist`))
      } else {
        fieldFound.setName(name);
        resolve(fieldFound);
      }
    })
  }
  editFieldType(id: number, type: TypeField): Promise<Field> {
    return new Promise<Field>((resolve, reject) => {
      const fieldFound = this.container.find((field: Field) => field.getId() === id);
      if (!fieldFound) {
        reject(new Error(`Field with id:${id} doesnt exist`))
      } else {
        fieldFound.setTypeField(type);
        resolve(fieldFound);
      }
    });

  }
  editFieldPrice(id: number, price: number): Promise<Field> {
    return new Promise<Field>((resolve, reject) => {
      const fieldFound = this.container.find((field: Field) => field.getId() === id);
      if (!fieldFound) {
        reject(new Error(`Field with id:${id} doesnt exist`))
      } else {
        fieldFound.setPrice(price);
        resolve(fieldFound);
      }
    });
  }
  deleteField(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.container.findIndex((field: Field) => field.getId() === id)
      if (index == -1) {
        reject(new Error(`Field with id:${id} doesnt exist`));
      } else {
        this.container.splice(index, 1);
      }
    })
  }
}

export default new MockField();
