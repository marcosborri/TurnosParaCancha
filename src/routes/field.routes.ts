import { Router } from "express";
import fieldController from "../controllers/field.controller";

const routes = Router();

routes.get("/", fieldController.getAllFields);
routes.get("/:id", fieldController.getFieldById);
routes.post("/", fieldController.addNewField);
routes.delete("/:id", fieldController.eliminateField);
routes.put("/name", fieldController.editName);
routes.put("/type", fieldController.editType);
routes.put("/price", fieldController.editPrice);

export default routes;
