import { describe, it, expect, beforeAll } from "vitest";
import FieldService from './../../services/FieldService.service';
import { Field } from "../../models/field.model";
import fieldRepo from "../../models/implementations/mock/mockField";
import {TypeField} from "../../models/field.model"

let field1: Field


beforeAll(async () => {
  field1 = new Field(1, "Cancha_A", "F5", 30000);
  await fieldRepo.addField(field1)
});

describe('Reglas de servicio - fieldService', ()=>{
    it('El id es incorrecto', async () => {
        await expect(FieldService.getField(-912)).rejects.toThrow("El ID no es correcto");
    });

    it('No encuentra cancha con id', async () => {
        await expect(FieldService.getField(2)).rejects.toThrow("No hay cancha con ese id")
    });

    it("Obtiene una cancha correctamente", async () => {
        const cancha = await FieldService.getField(1);
        expect(cancha.getName()).toBe("Cancha_A");
    });

    it("Agrega una nueva cancha", async () => {
        const data = { name: "Cancha_C", type: "F9", price: 40000 };
        const canchaAgregada = await FieldService.addField(data);
        expect(canchaAgregada.getName()).toBe("Cancha_C");
    });

    it("No puede eliminar una cancha inexistente", async () => {
        await expect(FieldService.deleteField(999)).rejects.toThrow("Error al eliminar la cancha Error: Field with id:999 doesnt exist");
    });
})