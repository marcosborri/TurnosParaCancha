import { Router } from "express";
import fieldController from "../controllers/field.controller";

const routes = Router();

routes.get("/", fieldController.getAllFields);
routes.get("/:id", fieldController.getFieldById);
routes.post("/", fieldController.addNewField);
routes.delete("/:id", fieldController.eliminateField);
routes.put("/name/:id", fieldController.editName);
routes.put("/type/:id", fieldController.editType);
routes.put("/price/:id", fieldController.editPrice);

export default routes;
