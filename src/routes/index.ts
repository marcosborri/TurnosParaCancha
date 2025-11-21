import { Router } from "express";
import userRoutes from "../routes/user.routes";
import reservationRoutes from "../routes/reservation.routes";
import fieldRoutes from "../routes/field.routes";
const router = Router();

router.use("/fields", fieldRoutes);
router.use("/reservations", reservationRoutes);
router.use("/users", userRoutes);

export default router;
