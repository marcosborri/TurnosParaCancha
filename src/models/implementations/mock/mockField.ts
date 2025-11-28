import { FieldCrud } from "../../interface/fieldCrud.model";
import { Field, TypeField } from "../../field.model";
import { FieldFactory } from "../../../factories/field.factory";
import { saveData, loadData } from "../../../utils/jsonFunctions.utils";

export class MockField implements FieldCrud {
  protected filePath: string = "src/database/fields.json";
  constructor() {}

  getField(id: number): Promise<Field> {
    return new Promise(async (resolve, reject) => {
      const data = await loadData(this.filePath);
      const result = data.find((f: any) => f.id === id);

      if (!result) {
        reject(new Error(`Field with id:${id} doesnt exist`));
      } else {
        const fieldObj = FieldFactory.create(result.name, result.typeField);
        fieldObj.setId(result.id);
        fieldObj.setPrice(result.price);
        resolve(fieldObj);
      }
    });
  }
  getFields(): Promise<Array<Field>> {
    return new Promise<Array<Field>>(async (resolve) => {
      const data = await loadData(this.filePath);
      resolve(data);
    });
  }
  addField(data: { name: string; type: TypeField }): Promise<Field> {
    return new Promise<Field>(async (resolve, reject) => {
      try {
        const dataJson = await loadData(this.filePath);
        const field = FieldFactory.create(data.name, data.type);
        let id = dataJson.length + 1;

        while (dataJson.find((f: any) => f.id === id)) {
          id++;
        }

        field.setId(id++);
        dataJson.push(field);
        saveData(dataJson, this.filePath);
        resolve(dataJson);
      } catch (error) {
        reject(error);
      }
    });
  }
  editFieldName(id: number, name: string): Promise<Field> {
    return new Promise<Field>(async (resolve, reject) => {
      try {
        const data = await loadData(this.filePath);
        const fieldFound = data.find((field: any) => field.id === id);
        if (!fieldFound) {
          reject(new Error(`Field with id:${id} doesnt exist`));
        } else {
          fieldFound.name = name;
          saveData(data, this.filePath);
          resolve(fieldFound);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  editFieldType(id: number, type: TypeField): Promise<Field> {
    return new Promise<Field>(async (resolve, reject) => {
      const data = await loadData(this.filePath);
      const fieldFound = data.find((field: any) => field.id === id);
      if (!fieldFound) {
        reject(new Error(`Field with id:${id} doesnt exist`));
      } else {
        fieldFound.typeField = type;
        saveData(data, this.filePath);
        resolve(fieldFound);
      }
    });
  }

  editFieldPrice(id: number, price: number): Promise<Field> {
    return new Promise<Field>(async (resolve, reject) => {
      const data = await loadData(this.filePath);
      const fieldFound = data.find((field: any) => field.id === id);
      if (!fieldFound) {
        reject(new Error(`Field with id:${id} doesnt exist`));
      } else {
        fieldFound.price = price;
        saveData(data, this.filePath);
        resolve(fieldFound);
      }
    });
  }
  deleteField(id: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const data = await loadData(this.filePath);
      const index = data.findIndex((field: any) => field.id === id);
      if (index == -1) {
        reject(new Error(`Field with id:${id} doesnt exist`));
      } else {
        data.splice(index, 1);
        saveData(data, this.filePath);
        resolve();
      }
    });
  }
}

export default new MockField();
