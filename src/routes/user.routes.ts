import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.addNewUser);
router.delete("/:id", userController.eliminateUser);
router.put("/email/:id", userController.emailUserEdit);
router.put("/username/:id", userController.usernameUserEdit);
router.put("/phonenumber/:id", userController.phonenumberUserEdit);

export default router;
