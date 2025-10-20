import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import { Field } from "../../models/field.model";
import { MockField } from "../../models/implementations/mock/mockField";
let field2: Field;

beforeAll(() => {
  field2 = new Field(2, "CanchaFutbol_B", "F7", 35000);
});

let mock: MockField;
let field1: Field;
beforeEach(async () => {
  mock = new MockField();
  field1 = new Field(1, "CanchaFutbol_A", "F5", 30000);
  await mock.addField(field1);
});

describe("Operaciones CRUD de mockField", () => {
  it("Obtener Canchas", async () => {
    const canchas = await mock.getFields();
    expect(canchas.length).toBeGreaterThan(0);
  });

  it("Agregar cancha", async () => {
    const canchaAgregada = await mock.addField(field2);
    const canchas = await mock.getFields();
    expect(canchas.length).toBe(2);
  });

  it("Obtener Cancha por su id", async () => {
    const id = field1.getId();
    const canchaEncontrada = await mock.getField(id);

    expect(canchaEncontrada).toEqual(field1);
  });

  it("Editar el nombre de la cancha", async () => {
    const id = field1.getId();
    const nuevoNombre = "CanchaFutbol_C";

    await mock.editFieldName(id, nuevoNombre);
    const canchaEditada = await mock.getField(id);

    expect(canchaEditada.getName()).toBe(nuevoNombre);
  });

  it("Editar el tipo de cancha", async () => {
    const id = field1.getId();
    const nuevoTipo = "F9";

    await mock.editFieldType(id, nuevoTipo);
    const canchaEditada = await mock.getField(id);

    expect(canchaEditada.getTypeField()).toBe(nuevoTipo);
  });

  it("Editar el precio de la cancha", async () => {
    const id = field1.getId();
    const nuevoPrecio = 28000;

    await mock.editFieldPrice(id, nuevoPrecio);
    const canchaEditada = await mock.getField(id);

    expect(canchaEditada.getPrice()).toBe(nuevoPrecio);
  });

  it("Eliminar una cancha", async () => {
    const id = field2.getId();

    mock.deleteField(id);
    const canchas =  mock.getFields();

    expect((await canchas).length).toBe(1);
  });
});
