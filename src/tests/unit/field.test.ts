import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import mockField, { MockField } from "../../models/implementations/mock/mockField";
import { TypeField } from "../../models/field.model";

let mock: MockField;
let field1Id: number;
let field2Id: number;

beforeEach(async () => {
  mock = new MockField();

  const cancha1 = await mock.addField({
    name: "CanchaFutbol_A",
    type: "F5",
    price: 30000,
  });

  const cancha2 = await mock.addField({
    name: "Cancha_1_F5",
    type: "F5",
    price: 10000,
  });

  field1Id = cancha1.getId();
  field2Id = cancha2.getId();
});

describe("Operaciones CRUD de mockField", () => {
  it("Obtener canchas", async () => {
    const canchas = await mock.getFields();
    expect(canchas.length).toBe(2);
  });

  it("Agregar una cancha", async () => {
    await mock.addField({
      name: "Nueva cancha",
      type: "F6",
      price: 25000,
    });

    const canchas = await mock.getFields();
    expect(canchas.length).toBe(3);
  });

  it("Obtener cancha por ID", async () => {
    const cancha = await mock.getField(field1Id);
    expect(cancha.getName()).toBe("CanchaFutbol_A");
  });

  it("Editar nombre", async () => {
    await mock.editFieldName(field1Id, "Cancha Editada");
    const cancha = await mock.getField(field1Id);

    expect(cancha.getName()).toBe("Cancha Editada");
  });

  it("Editar tipo", async () => {
    await mock.editFieldType(field1Id, "F7" as TypeField);
    const cancha = await mock.getField(field1Id);

    expect(cancha.getTypeField()).toBe("F7");
  });

  it("Editar precio", async () => {
    await mock.editFieldPrice(field1Id, 28000);
    const cancha = await mock.getField(field1Id);

    expect(cancha.getPrice()).toBe(28000);
  });

  it("Eliminar cancha", async () => {
    mock.deleteField(field2Id);

    const canchas = mock.getFields();
    expect((await canchas).length).toBe(1);
  });
});
