// import { beforeAll, beforeEach, describe, expect, it } from "vitest";
// import  FieldService  from "../../services/FieldService.service";
// import fieldRepo from "../../models/implementations/mock/mockField";


// beforeAll(async () => {
//   await fieldRepo.addField({name: "Cancha_A", type: "F5"})
// })



// describe('Reglas de servicio - fieldService', ()=>{
//     it('El id es incorrecto', async () => {
//         await expect(FieldService.getField(-912)).rejects.toThrow("El ID no es correcto");
//     });

//     it('No encuentra cancha con id', async () => {
//         await expect(FieldService.getField(2)).rejects.toThrow("No hay cancha con ese id")
//     });

//     it("Obtiene una cancha correctamente", async () => {
//         const cancha = await FieldService.getField(1);
//         expect(cancha.getName()).toBe("Cancha_A");
//     });

//     it("Agrega una nueva cancha", async () => {
//         const canchaAgregada = await FieldService.addField({name: "Cancha_C", type: "F11"});
//         expect(canchaAgregada.getName()).toBe("Cancha_C");
//     });

//     it("No puede eliminar una cancha inexistente", async () => {
//         await expect(FieldService.deleteField(999)).rejects.toThrow("Error al eliminar la cancha Error: Field with id:999 doesnt exist");
//     });
// })