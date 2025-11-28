import { Router } from "express";
import fieldController from "../controllers/field.controller";

const routes = Router();

/**
 * @openapi
 * /fields:
 *   get:
 *     summary: Obtener todas las canchas
 *     tags:
 *       - Fields
 *     responses:
 *       200:
 *         description: Lista de canchas obtenida exitosamente
 */
routes.get("/", fieldController.getAllFields);

/**
 * @openapi
 * /fields/{id}:
 *   get:
 *     summary: Obtener cancha por ID
 *     tags:
 *       - Fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cancha encontrada
 *       404:
 *         description: Cancha no encontrada
 */
routes.get("/:id", fieldController.getFieldById);

/**
 * @openapi
 * /fields:
 *   post:
 *     summary: Crear cancha
 *     tags:
 *       - Fields
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cancha 5
 *               type:
 *                 type: string
 *                 example: Futbol 5
 *     responses:
 *       201:
 *         description: Cancha creada exitosamente
 */
routes.post("/", fieldController.addNewField);

/**
 * @openapi
 * /fields/{id}:
 *   delete:
 *     summary: Eliminar cancha
 *     tags:
 *       - Fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cancha eliminada
 */
routes.delete("/:id", fieldController.eliminateField);

/**
 * @openapi
 * /fields/name/{id}:
 *   put:
 *     summary: Editar nombre
 *     tags:
 *       - Fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nombre editado correctamente
 */
routes.put("/name/:id", fieldController.editName);

/**
 * @openapi
 * /fields/type/{id}:
 *   put:
 *     summary: Editar tipo
 *     tags:
 *       - Fields
 */
routes.put("/type/:id", fieldController.editType);

/**
 * @openapi
 * /fields/price/{id}:
 *   put:
 *     summary: Editar precio
 *     tags:
 *       - Fields
 */
routes.put("/price/:id", fieldController.editPrice);

export default routes;
