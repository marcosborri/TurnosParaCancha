import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.addNewUser);
router.post("/:id", userController.eliminateUser);
router.put("/email", userController.emailUserEdit);
router.put("/username", userController.usernameUserEdit);
router.put("/phonenumber", userController.phonenumberUserEdit);

export default router;
