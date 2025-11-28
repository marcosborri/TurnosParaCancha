import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.get("/", userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", userController.getUserById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Crear usuario
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - phonenumber
 *             properties:
 *               username:
 *                 type: string
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 example: juan@mail.com
 *               phonenumber:
 *                 type: string
 *                 example: "2914567890"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", userController.addNewUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 */
router.delete("/:id", userController.eliminateUser);

/**
 * @openapi
 * /users/username/{id}:
 *   put:
 *     summary: Editar username usuario
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: NuevoNombre
 *     responses:
 *       200:
 *         description: Username actualizado
 */
router.put("/email/:id", userController.emailUserEdit);

/**
 * @openapi
 * /users/email/{id}:
 *   put:
 *     summary: Editar email usuario
 *     tags:
 *       - Users
 */
router.put("/username/:id", userController.usernameUserEdit);

/**
 * @openapi
 * /users/phonenumber/{id}:
 *   put:
 *     summary: Editar número de teléfono usuario
 *     tags:
 *       - Users
 */
router.put("/phonenumber/:id", userController.phonenumberUserEdit);

export default router;
